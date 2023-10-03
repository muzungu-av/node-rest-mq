import os from 'os';

const platform = os.platform();
const type = os.type();
const uptime = os.uptime();

export const getDescriptionAboutSystem = function (req, res, next) {
    let descript = {};
    descript["platform"] = platform;
    descript["type"] = type;
    descript["uptime"] = uptime;
    req.description = descript;
    next();
}