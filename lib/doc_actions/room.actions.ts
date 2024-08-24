import { nanoid } from 'nanoid';

export const createDocument = async({ userId, email}:
    CreateDocumentParams) => {
        const roomId = nanoid();

        try {
            const RoomMetadata = {
                creatorId: userId,
                email,
                title: 'Untitled',
            }
            
        } catch (error) {
            console.log(`Error happened while creating document: ${error}`);
            
        }
    }
