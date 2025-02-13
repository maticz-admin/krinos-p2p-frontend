export const GetUserId = () => {
    var userid = atob(localStorage.getItem("xyz_cache"));
    return userid;
}