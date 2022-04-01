const arrayTest = (name) => {
    const test = /(\w{1,})\[([0-9]{1,})\]/.exec(name);
    return test ? { index: test[2], name: test[1] } : null;
}

function addSubProperty(source, name) {
    let isArr = arrayTest(name);
    if(isArr) {
        if(!source[isArr.name]) {
            source[isArr.name] = [{}];
        }
        if(!source[isArr.name][isArr.index]) {
            source[isArr.name][isArr.index] = {};
        }
        return source;
    }
    if(!source[name]) {
        source[name] = {};
    }
    return source;
}

export function addPopertyByPath(obj, path, value) {
    const parts = path.split('.');
    let part = parts[0];
    let isArr = arrayTest(part);

    if(parts.length > 1) {
        obj = addSubProperty(obj, part);
        const subPath = parts.slice(1).join('.');
        if(isArr){
            obj[isArr.name][isArr.index] = addPopertyByPath(obj[isArr.name][isArr.index], subPath, value);
            return obj;
        }
        obj[part] = addPopertyByPath(obj[part], subPath, value);
        return obj;
    }

    if(isArr) {
        if(!obj[isArr.name]) {
            obj[isArr.name] = [];
        }
        obj[isArr.name][isArr.index] = value;
        return obj;
    }

    obj[part] = value;
    return obj;
}