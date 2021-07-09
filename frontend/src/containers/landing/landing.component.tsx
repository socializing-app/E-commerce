import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import HeaderComponent from '../../components/header/header.component';
import HeroComponent from '../../components/hero/hero.component';
import FeaturedComponent from '../../components/featured/featured.component';
import ReviewsComponent from '../../components/reviews/reviews.component';
import OffersComponent from '../../components/offers/offers.component';
import ShowcaseComponent from '../../components/showcase/showcase.component';
import ClubComponent from '../../components/club/club.component';
import FooterComponent from '../../components/footer/footer.component';
import FeedbackComponent from '../../components/feedback/feedback.component';
import ChatComponent from '../../components/chat/chat.component';

const LandingComponent = ( props: any ) => {
    return <Container>
                <Row>
                    <HeaderComponent />
                    <HeroComponent />
                    <FeaturedComponent />
                    <ReviewsComponent />
                    <OffersComponent />
                    <ShowcaseComponent />
                    <ClubComponent />
                    <FooterComponent />
                    <FeedbackComponent />
                    <ChatComponent />

                    {/* HeaderComponent */}
                        {/* NavigationComponent */}
                        {/* SearchComponent */}
                        {/* AccountComponent */}
                        {/* BasketComponent */}

                    {/* HeroComponent */}
                        {/* CarouselComponent */}

                    {/* FeaturedComponent */}
                        {/* ProductsComponent */}
                            {/* ProductComponent */}

                    {/* ReviewsComponent */}
                        {/* ReviewComponent */}
                </Row>
           </Container>
}

export default LandingComponent;