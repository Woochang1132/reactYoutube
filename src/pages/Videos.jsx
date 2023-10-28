import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom/dist';
import VideoCard from '../components/VideoCard';
import { search } from '../api/youtube';

export default function Videos() {
    // 객체에 어떤 keyword가 있는 지 알 수 있다.
    const {keyword} = useParams();
    const {isLoding, error, data:videos} = useQuery({
        queryKey :['videos', keyword] , 
        queryFn: () => search(keyword) });
    return (
        <div>
            Videos {keyword ? `🖱${keyword}` : '🔥'}
            {isLoding && <p>Loding...</p>}
            {error && <p>Something is wrong</p>}
            {videos && 
                <ul>
                {videos.map(video => <VideoCard key={video.id} video={video}/>)}
                </ul>}
        </div>
    );
}



