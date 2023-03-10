// Thanks to Amazon.com, Inc. :)
// SPDX-License-Identifier: MIT-0

import React, { useEffect, useState } from 'react';
import { MessageAttachment } from 'amazon-chime-sdk-component-library-react';
import AttachmentService from '../../../services/AttachmentService';
import { formatBytes, arnParser } from '../../../utils/aws';
import appConfig from '../../../Config';

/**
 * Attachment Processor which provides MessageAttachment component with downloadUrl
 * @param {string} fileKey S3 bucket file key
 * @param {string} name File name or title
 * @param {number} [size=0] File byte size
 * @param {string} senderId AWS Cognito userId of the provided fileKey
 * @returns {MessageAttachment} MessageAttachment
 */
export const AttachmentProcessor = ({ fileKey, name, size = 0, senderId }:any) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    async function getUrl() {
      const data = await AttachmentService.download(
        fileKey,
        `${appConfig.region}:${arnParser(senderId).relativeValue}`
      );
      setUrl(data);
    }
    getUrl();
  }, [fileKey, senderId]);

  return (
    <MessageAttachment name={name} downloadUrl={url} size={formatBytes(size)} />
  );
};

export default AttachmentProcessor;
