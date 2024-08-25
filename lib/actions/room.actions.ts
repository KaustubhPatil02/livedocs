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