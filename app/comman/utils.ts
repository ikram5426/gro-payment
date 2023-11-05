export const extractTokenFromUrl = () => {
  const url = window.location.href;
  const decodedUrl = decodeURIComponent(url)
  const decodedUrlObject = new URL(decodedUrl)
    const accessToken =  decodedUrlObject.searchParams.get('accessToken');
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      console.log("Token not found in the URL");
    }
}