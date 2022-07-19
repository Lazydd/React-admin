const global = {
    getCookie(key: string) {
        const data = document.cookie;

        let startIndex = data.indexOf(key + "=");

        if (startIndex > -1) {
            startIndex = startIndex + key.length + 1;

            let endIndex = data.indexOf(";", startIndex);

            endIndex = endIndex < 0 ? data.length : endIndex;

            return decodeURIComponent(data.substring(startIndex, endIndex));
        } else {
            return "";
        }
    },

    setCookie(key: string, value: any, time?: any) {
        const times = time;
        const cur = new Date();
        cur.setTime(cur.getTime() + times * 24 * 3600 * 1000);
        document.cookie =
            key +
            "=" +
            encodeURIComponent(value) +
            ";expires=" +
            (times === undefined ? "" : cur.toUTCString());
    },

    delCookie(key: string) {
        const data = this.getCookie(key);

        if ((data as any) !== false) {
            this.setCookie(key, data, -1);
        }
    },

    getStorage(key: string) {
        return localStorage.getItem(key);
    },

    setStorage(key: string, value: any) {
        return localStorage.setItem(key, value);
    },

    delStorage(key: string) {
        localStorage.removeItem(key);
    },
};

export default global;
