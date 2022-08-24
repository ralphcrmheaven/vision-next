// Thanks to Amazon.com, Inc. :)
// SPDX-License-Identifier: MIT-0

// Publish status to channel every 10 seconds
export const PUBLISH_INTERVAL = 10000;

// Check status every 15 seconds
export const REFRESH_INTERVAL = 15000;

// 20 seconds
export const STATUS_GRACE_PERIOD = 20;

// Control messages have 30 bytes limit
export const MAX_PRESENCE_STATUS_LENGTH = 25;

export const PRESENCE_REGEX = /P\|/;
export const PRESENCE_PREFIX = 'P|';
export const PRESENCE_PREFIX_SEPARATOR = '|';

export const PresenceMode = {
    Auto: "Auto",
    Wfh: "Wfh",
    Custom: "Cu",
}

export const PresenceStatusPrefix = {
    Auto: "Auto|",
    Wfh: "Wfh|",
    Custom: "Cu|", // Keep it short for control messages
}

export const PresenceAutoStatus = {
    Online: "Online",
    Offline: "Offline",
    Idle: "Idle",
    Busy: "Busy",
}

export const toPresenceMessage = (type:any, status:any, includePrefix:any) => {
    const prefix = includePrefix ? PRESENCE_PREFIX : '';
    return `${prefix}${type}|${status}`;
}

export const isAutomaticStatusExpired = (lastUpdatedTimestamp:any) => {
    if (!lastUpdatedTimestamp) return lastUpdatedTimestamp;
    return (Date.now() - Number(new Date(lastUpdatedTimestamp))) / 1000 > STATUS_GRACE_PERIOD;
}

export const toPresenceMap = (metadata:any) => {
    const parsedMetadata = metadata && JSON.parse(metadata);
    if (parsedMetadata && parsedMetadata.Presence) {
        return Object.fromEntries(parsedMetadata.Presence.map((entry:any) => [entry.u, entry.s]));
    }
    return null;
}

export const formatBytes = (bytes:any, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
  
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const arnParser = (arn:any) => {
    const arnMap = [
      'arn',
      'aws',
      'service',
      'region',
      'namespace',
      'relativeId',
      'relativeValue',
    ];
    return arn.split(':').reduce(function (aggregator:any, piece:any, index:any) {
      aggregator[arnMap[index]] = piece;
      return aggregator;
    }, {});
};

export const mergeArrayOfObjects = (original:any, newdata:any, uniqueSelector = '') => {
    newdata.forEach((dat:any) => {
      const foundIndex = original.findIndex(
        (ori:any) => ori[uniqueSelector] === dat[uniqueSelector]
      );
      if (foundIndex >= 0) original.splice(foundIndex, 1, dat);
      else original.push(dat);
    });
  
    return original;
};