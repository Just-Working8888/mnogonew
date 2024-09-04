import { CancelToken } from 'axios';
import { instance } from './index'
import { IPeviewsGet, IReviews, IReviewsDto } from '../store/models/IReviews';




const getReviews = (sourceToken?: CancelToken) =>
    instance.get<IPeviewsGet>(`/reviews/`, { cancelToken: sourceToken });

const getReviewsById = (id: number, sourceToken?: CancelToken) =>
    instance.get<IReviews>(`/reviews/${id}`, { cancelToken: sourceToken });

const createReviews = (data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.post('/reviews/', { ...data }, { cancelToken: sourceToken });

const updateReviews = (id: number, data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.put(`/reviews/${id}`, { ...data }, { cancelToken: sourceToken });

const patchReviews = (id: number, data: IReviewsDto, sourceToken?: CancelToken) =>
    instance.patch(`/reviews/${id}`, { ...data }, { cancelToken: sourceToken });

const deleteReviewsById = (id: number, sourceToken?: CancelToken) =>
    instance.delete(`/reviews/${id}`, { cancelToken: sourceToken });

const endpoints = {
    getReviews,
    getReviewsById,
    createReviews,
    updateReviews,
    patchReviews,
    deleteReviewsById
};
export default endpoints;
