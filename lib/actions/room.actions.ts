'use server';

// Import necessary modules and functions
import { nanoid } from 'nanoid'; // For generating unique IDs
import { liveblocks } from '../liveblocks'; // Liveblocks API for room management
import { revalidatePath } from 'next/cache'; // For revalidating Next.js cache
import { getAccessType, parseStringify } from '../utils'; // Utility function for parsing and stringifying
import { redirect } from 'next/navigation';
import { title } from 'process';

// Define the createDocument function
export const createDocument = async ({ userId, email }: CreateDocumentParams) => {
    // Generate a unique room ID
    const roomId = nanoid();

    try {
        // Define metadata for the room
        const metadata = {
            creatorId: userId, // ID of the user creating the room
            email, // Email of the user creating the room
            title: 'Untitled', // Default title for the room
        };

        // Define access permissions for users
        const usersAccesses: RoomAccesses = {
            [email]: ['room:write'] // Grant write access to the user
        };

        // Create the room using liveblocks API
        const room = await liveblocks.createRoom(roomId, {
            metadata, // Attach metadata to the room
            usersAccesses, // Attach user access permissions
            defaultAccesses: [] // No default access permissions
        });

        // Revalidate the cache for the root path
        revalidatePath('/');

        // Return the created room after parsing and stringifying
        return parseStringify(room);
    } catch (error) {
        // Log any errors that occur during room creation
        console.log(`Error happened while creating document: ${error}`);
    }
};

// getiing specific room
export const getDocument = async ({ roomId, userId }: {roomId: string; userId: string}) => {
   try {
    const room = await liveblocks.getRoom(roomId);
//   TODO: uncomment this later
    const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    if(!hasAccess) {
       throw new Error('You do not have access to this document');
    }

    return parseStringify(room);
   } catch (error) {
    console.log(`Error fetching document: ${error}`);
    
   }
}

// updating document
export const updateDocument = async (roomId: string, title: string) => {
    try {
        // const room = await liveblocks.getRoom(roomId);
        const updatedRoom =  await liveblocks.updateRoom(roomId,{
            metadata: {
                title,
            }
        });
        revalidatePath(`/documnets/${roomId}`);
        return parseStringify(updatedRoom);
    } catch (error) {
        console.log(`Error updating document: ${error}`);
    }
}

// fetching specific user documents
export const fetchDocument = async (email :string) => {
    try {
     const rooms = await liveblocks.getRooms({userId: email});
 //  
 
     return parseStringify(rooms);
    } catch (error) {
     console.log(`Error fetching document: ${error}`);
     
    }
 }

//  getting specific room users
// export const getDocumentUsers = async (roomId: string) => {}

export const updateDocumentAccess = async ({ roomId, email, userType, updatedBy }: ShareDocumentParams) => {
    try {
        const usersAccesses: RoomAccesses = {
            [email]: getAccessType(userType) as AccessType,
        }
        const room = await liveblocks.updateRoom(roomId, {
            usersAccesses
        })
        if(room){
            const notificationId = nanoid();

            await liveblocks.triggerInboxNotification({
                userId: email,
                kind: '$documentAccess',
                subjectId:notificationId,
                activityData:{
                    title: `You have been added as a '${userType}' in their document by ${updatedBy.name}`,
                    updatedBy: updatedBy.name,
                    avatar: updatedBy.avatar,
                    email: updatedBy.email,
                },
                roomId
            })

        }
        revalidatePath(`/documents/${roomId}`);
        return parseStringify(room);
    } catch (error) {
        console.log(`Error updating document access: ${error}`);
    }
}

export const removeOtherCollaborators = async ({roomId, email}: {roomId:string, email: string}) => {
    try {
        const room = await liveblocks.getRoom(roomId);
        if(room.metadata.email === email){
            throw new Error('You cannot remove yourself from the document'); 
        }

        const updatedRoom = await liveblocks.updateRoom(roomId, {
            usersAccesses: {
                [email]: null
            }
        })
        revalidatePath(`/documents/${roomId}`);
        return parseStringify(updatedRoom);
    } catch (error) {
        console.log(`Error removing user: ${error}`);
    }
}

export const deleteDocument = async (roomId: string) => {
    try {
        await liveblocks.deleteRoom(roomId);
        revalidatePath('/');
        redirect('/');
      } catch (error) {
        console.log(`Error happened while deleting a room: ${error}`);
      }
    }