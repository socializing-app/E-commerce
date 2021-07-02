export const set = (key: string, item: string): void => {
    localStorage.setItem(key, item);
}

export const setObj = (key: string, object: any): any => {
    const item: string = JSON.stringify(object);
    
    localStorage.setItem(key, item);
}

export const get = (key: string): string | null => {
    return localStorage.getItem(key);
}

export const getObj = (key: string): any => {
    const item: string = localStorage.getItem(key) as string;
    const object = JSON.parse(item);

    return object || {};
}

export const remove = (key: string): void => {
    localStorage.removeItem(key);
}

export const clear = (): void => {
    localStorage.clear();
}