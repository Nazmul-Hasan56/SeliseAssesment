//time calculation func
export default timeDifference = (timestamp) => {
    const now = new Date();
    const targetDateUTC = new Date(timestamp); // Target date in UTC    
    const diffInMillis = now - targetDateUTC; // Difference in milliseconds
    const diffInHours = Math.floor(diffInMillis / (1000 * 60 * 60));
    return diffInHours > 0 ? diffInHours : 0;
}