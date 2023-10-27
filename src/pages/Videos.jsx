import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom/dist';
import VideoCard from '../components/VideoCard';
import axios from 'axios';

export default function Videos() {
    // 객체에 어떤 keyword가 있는 지 알 수 있다.
    const {keyword} = useParams();
    const {isLoding, error, data:videos} =useQuery({
        queryKey :['videos', keyword] , 
        queryFn: async () => {return axios.get(`/videos/${keyword ? 'search' : 'popular'}.json`)
        .then((res) => res.data.items);
    }});
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



