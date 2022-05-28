import { useVideo } from "context/VideoContext";
import { useEffect, useState } from "react";

export const useInfiniteScroll = ({ lastElement }) => { 
    const { videoContextList, setVideoContextList } = useVideo();
    const totalPages = Math.ceil((videoContextList?.length || 0) / 6);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const elementRef = lastElement.current;
        console.log(lastElement,elementRef,videoContextList,pageNum,totalPages);
        const handleObserver = (entries) => {
            const target = entries[0];
            console.log("target", target);
            console.log(lastElement,elementRef,videoContextList,pageNum,totalPages);
			if (
				target.isIntersecting &&
				(pageNum < totalPages || (pageNum === 0 && totalPages === 0))
            ) {
                console.log("inner");
				setLoading(true);
				setPageNum((prev) => prev + 1);
				setTimeout(() => setLoading(false), 1000);
			}
		};
		const observer = new IntersectionObserver(handleObserver);
		if (elementRef) {
			observer.observe(elementRef);
		}
		return () => {
			observer.unobserve(elementRef);
		};
        
    }, []);
    return { pageNum, loading };
}