var debounceTime;

export const debounce = (callback,time)=> {
    window.clearTimeout(debounceTime);
    debounceTime = Number(setTimeout(callback, time) ?? 0);
}
