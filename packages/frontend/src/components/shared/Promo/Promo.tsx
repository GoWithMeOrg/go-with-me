import React from 'react';
import ArrowCircle from '@/assets/icons/arrowCircle.svg';
import PromoIcon from '@/assets/icons/promoIcon.svg';
import { Button } from '@/components/shared/Button';
import { usePopup } from '@/components/shared/Popup/hooks';
import { Title } from '@/components/shared/Title';
import { AuthModal } from '@/components/widgets/AuthModal';

import { Popup } from '../Popup';

import classes from './Promo.module.css';

export const Promo = () => {
  const { handleShowPopup, handleHidePopup, showPopup, setShowPopup } = usePopup({});

  return (
    <section className={classes.promo}>
      <div className={classes.promoDescription}>
        <Title title={'НАЧНИ СВОЁ ПРИКЛЮЧЕНИЕ ЗДЕСЬ'} tag={'h1'} />
        {/* <p className={classes.promoText}>
                    Craft your trips and events effortlessly. Whether you&#39;re planning a&nbsp;weekend getaway
                    with&nbsp;friends, organizing a&nbsp;cultural exploration, arranging a&nbsp;concert, coordinating
                    a&nbsp;conference, or&nbsp;hosting a&nbsp;casual meeting, we&#39;re here to&nbsp;help you every step
                    of&nbsp;the way. Join us today and unlock a&nbsp;world of&nbsp;endless possibilities. Start crafting
                    your adventure now!
                </p> */}

        <p className={classes.promoText}>
          Создавайте свои поездки и мероприятия без&nbsp;лишних усилий. Планируете ли вы поездку на
          &nbsp;выходные с друзьями, организуете культурное путешествие, устраиваете концерт,
          конференцию или проводите случайную встречу, мы готовы помочь вам на каждом шагу.
          Присоединяйтесь к нам сегодня и&nbsp;откройте для себя мир бесконечных возможностей.
          Начните создавать свое приключение прямо сейчас!
        </p>

        <div className={classes.promoButton}>
          <Button className={classes.promoLink} resetDefaultStyles={true} onClick={handleShowPopup}>
            Начать
            <ArrowCircle style={{ marginLeft: '0.75rem' }} />
          </Button>
        </div>

        <Popup showPopup={showPopup} setShowPopup={setShowPopup} popupMode={'auth'}>
          <AuthModal onClose={handleHidePopup} />
        </Popup>
      </div>

      <PromoIcon style={{ marginBottom: '10px' }} />
    </section>
  );
};

export default Promo;
