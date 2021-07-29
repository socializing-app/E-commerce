import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from "./star.component.module.scss";

interface Star {
    rating: number;
    spacing: string;
    size: "xs" | "lg" | "sm" | "1x" | "2x" | "3x";
}

const StarComponent: React.FC<Star> = ( props: Star ): JSX.Element => {
    const { rating, spacing, size } = props;
    const numberOfStars = 5;

    const draw = ( rating: number ) => {
        const full = Math.floor(rating);
        const empty = numberOfStars - Math.ceil(rating);
        const half = numberOfStars - ( full + empty );
        const stars = [];

        for ( let i = 0; i < full; i++ ) stars.push(['fas', 'star']);

        if ( half > 0 ) stars.push(['fas', 'star-half-alt']);

        for ( let i = 0; i < empty; i++ ) stars.push(['far', 'star']);

        return stars;
    }

    return <div className={styles.stars}>
                { draw(rating).map((star: any, index: number) => (
                    <FontAwesomeIcon size={size} icon={star} className={styles.stars__star} key={`star-${index}`} style={{ marginLeft: spacing }} />
                )) }
           </div>
}

export default StarComponent;