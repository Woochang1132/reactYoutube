import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom/dist';
import VideoCard from '../components/VideoCard';
//import { search } from '../api/youtube';
//import FakeYoutube from '../api/fakeYoutubeClient';
//import Youtube from '../api/fakeYoutubeClient';
import { useYoutubeApi } from '../context/YoutubeApiContext';

export default function Videos() {
    // 객체에 어떤 keyword가 있는 지 알 수 있다.
    const {keyword} = useParams();
    const {youtube} = useYoutubeApi();
    const {isLoding, error, data:videos} = useQuery({
        queryKey :['videos', keyword] , 
        queryFn: () => youtube.search(keyword)
             //const youtube = new FakeYoutube();
             //return youtube.search(keyword);
        });
    return (
        <>
            Videos {keyword ? `🖱${keyword}` : '🔥'}
            {isLoding && <p>Loding...</p>}
            {error && <p>Something is wrong</p>}
            {videos && 
                <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 gap-y-4' >
                {videos.map(video => <VideoCard key={video.id} video={video}/>)}
                </ul>}
        </>
    );
}



