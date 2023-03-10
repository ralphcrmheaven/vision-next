// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import { Amplify, Auth, Storage } from 'aws-amplify';



/**
 * @class AttachmentService
 *
 * @description can be used to upload, download and remove attachments
 */
class AttachmentService {
    /**
     * userLevel : private|protected|public
     */
    static userLevel = 'public';

    /**
     * userUploadDir : Default prefix of upload directory
     */
    static userUploadDir = 'uploadfiles';

    /**
     * Upload file object to AWS S3 bucket using 'userLevel' defined within this class.
     * @param {object} fileObj File to be put in bucket
     * @returns {Promise} promise resolves to object on success
     */
    static async upload(fileObj) {
        try {
            const response = await Storage.put(
                `${this.userUploadDir}/${fileObj.name}`,
                fileObj, {
                    contentType: fileObj.type,
                    level: this.userLevel
                }
            );

            return response;
        } catch (err) {
            throw new Error(`Failed to upload file! with error: ${err}`);
        }
    }

    /**
     * Get a presigned URL of the file or the object data
     *
     * @param {string} fileKey - key of the object
     * @param {string} userId - userId of the user who shared the attachment.
     * @return {Promise}- A promise resolves to either a presigned url or the object
     */
    static download(fileKey, userId) {
        return Storage.get(fileKey, {
            download: true
        });
    }

    /**
     * Remove the object for specified key
     * @param {string} fileKey - key of the object
     * @return - Promise resolves upon successful removal of the object
     */
    static delete(fileKey) {
        return Storage.remove(fileKey, { level: this.userLevel });
    }

    static downloadRecording(fileKey) {
        return Storage.get(fileKey, { download: true, level: "public" });
    }



    static listFiles(fileKey) {
        Amplify.configure({
            Storage: {
                AWSS3: {
                    bucket: 'visionnextbucket224155-dev', //REQUIRED -  Amazon S3 bucket name
                    region: 'us-east-1', //OPTIONAL -  Amazon service region
                }
            }
        });

        return Amplify.Storage.list(fileKey);
    }
}

export default AttachmentService;