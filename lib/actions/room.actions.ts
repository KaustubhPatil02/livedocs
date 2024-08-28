'use server';

// Import necessary modules and functions
import { nanoid } from 'nanoid'; // For generating unique IDs
import { liveblocks } from '../liveblocks'; // Liveblocks API for room management
import { revalidatePath } from 'next/cache'; // For revalidating Next.js cache
import { parseStringify } from '../utils'; // Utility function for parsing and stringifying

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
            defaultAccesses: ['room:write'] // No default access permissions
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


export const getDocument = async ({ roomId, userId }: {roomId: string; userId: string}) => {
   try {
    const room = await liveblocks.getRoom(roomId);
//   TODO: uncomment this later
    // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

    // if(!hasAccess) {
    //    throw new Error('You do not have access to this document');
    // }

    return parseStringify(room);
   } catch (error) {
    console.log(`Error fetching document: ${error}`);
    
   }
}

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

export const fetchDocument = async (email :string) => {
    try {
     const rooms = await liveblocks.getRooms({userId: email});
 //  
 
     return parseStringify(rooms);
    } catch (error) {
     console.log(`Error fetching document: ${error}`);
     
    }
 }