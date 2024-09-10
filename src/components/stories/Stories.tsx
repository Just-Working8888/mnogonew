// StoriesSlider.tsx
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Stories from 'react-insta-stories';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

const storiesData = [
  {
    id: 1,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 2,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 3,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 1,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 2,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 3,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 1,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 2,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 3,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 1,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 2,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 3,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 1,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 2,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 3,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 1,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 2,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
  {
    id: 3,
    photos: ['https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg', 'https://media.post.rvohealth.io/wp-content/uploads/2021/09/sushi-sashimi-732x549-thumbnail-732x549.jpg'],
  },
];

const StoriesSlider: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [currentStoryIndex, setCurrentStoryIndex] = useState<number | null>(null);
  const [slidesPerView, setSlidesPerView] = useState(6);

  useEffect(() => {
    // Функция для обновления количества видимых слайдов на основе ширины экрана
    const updateSlidesPerView = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth > 1200) {
        setSlidesPerView(6);
      } else if (screenWidth > 992) {
        setSlidesPerView(4);
      } else if (screenWidth > 768) {
        setSlidesPerView(3);
      } else {
        setSlidesPerView(2);
      }
    };

    updateSlidesPerView();

    // Обработчик события для изменения количества слайдов при изменении размера окна
    window.addEventListener('resize', updateSlidesPerView);
    return () => {
      window.removeEventListener('resize', updateSlidesPerView);
    };
  }, []);
  const openModal = (index: number) => {
    setCurrentStoryIndex(index);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCurrentStoryIndex(null);
  };

  return (
    <div className="">
      <Swiper
        slidesPerView={slidesPerView}

        className='stories-slider'

        loop={true}
      >
        {storiesData.map((story, index) => (
          <SwiperSlide className='sex' key={story.id} onClick={() => openModal(index)} style={{ cursor: 'pointer' }}>
            <img src={story.photos[0]} alt="story-preview" style={{ width: 'calc(100% - 5px)', height: '250px', objectFit: 'cover', borderRadius: '10px' }} />
          </SwiperSlide>
        ))
        }
      </Swiper >

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}

        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 'auto',
            height: 'auto',
            padding: 0,

          },
        }}
      >
        {currentStoryIndex !== null && (
          <Stories
            stories={storiesData[currentStoryIndex].photos.map(photo => ({ url: photo }))}
            defaultInterval={3000}
            width={320}
            height={568}
          />
        )}

        {/* <button onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px' }}>Закрыть</button> */}
      </Modal>
    </div >
  );
};

export default StoriesSlider;
