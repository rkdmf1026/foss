import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';
import apiClient from './../../utils/util';
import Nav from '@components/Header/NavComponent';
import Intro from '@components/common/Intro';
import { useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const ReviewForm: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [respondentId, setRespondentId] = useState(location.state?.respondentId);
    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        const hasSubmitted = localStorage.getItem(`submittedReview_${respondentId}`);
        if (hasSubmitted) {
            setSubmitted(true);
        }
    }, [respondentId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || content.trim() === '') {
            setError('별점과 내용을 모두 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            await apiClient.post('/review', {
                respondentId,
                content,
                rating,
            });
            setContent('');
            setRating(0);
            setError('');
            setSubmitted(true);
            Swal.fire({
                icon: 'success',
                title: '리뷰 작성 완료',
                text: '리뷰가 성공적으로 작성되었습니다.',
            }).then(() => {
                navigate('/review');
            });
        } catch (err) {
            console.error('Error submitting review:', err);
            setError('리뷰 작성에 실패하였습니다. 다시 시도해주세요');
        } finally {
            setLoading(false);
        }
    };

    const renderRatingStars = () => {
        return (
            <div className="flex">
                {Array.from({ length: 5 }, (_, index) => (
                    <FaStar
                        size={'1.5rem'}
                        key={index}
                        className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                        onClick={() => {
                            setRating(index + 1);
                            setError('');
                        }}
                    />
                ))}
            </div>
        );
    };

    if (submitted) {
        return (
            <div className='w-screen h-screen flex flex-col'>
                <Nav />
                <div className="flex-grow flex items-center justify-center">
                    <div className="w-full max-w-3xl p-6 bg-white text-center">
                        <h1 className="text-2xl font-bold mb-4">리뷰를 작성하셨습니다</h1>
                        <p>이미 리뷰를 작성하셨습니다. 더 이상 리뷰를 작성할 수 없습니다.</p>
                        <button
                            onClick={() => navigate('/review')}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
                        >
                            리뷰 보기
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='w-screen h-screen flex flex-col'>
            <Nav />
            <div className="flex-grow flex items-center justify-center">
                <div className="w-full max-w-3xl p-6 bg-white">
                    <form onSubmit={handleSubmit}>
                        <Intro title='리뷰를 작성해주세요' sub='귀하의 리뷰는 다른 사용자에게 큰 도움이 됩니다!' />
                        {error && <div className="text-red-500 mb-4">{error}</div>}
                        <div className="mb-4">
                            {renderRatingStars()}
                        </div>
                        <div className="mb-4">
                            <textarea
                                className="w-full p-2 border border-slate-300 rounded resize-none"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={12}
                                placeholder='내용을 입력해주세요.'
                                required
                            />
                        </div>
                        <div className='text-center'>
                            <button
                                type="submit"
                                className="px-4 py-2 bg-blue-600 text-white rounded"
                                disabled={loading}
                            >
                                {loading ? '작성중...' : '작성하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewForm;