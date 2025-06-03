import styles from './profileCard.module.scss';

export default function ProfileCard() {
  return (
    <div className={styles.profileCard}>
      {/* Background decoration */}
      <div className={styles.backgroundDecoration}></div>
      
      {/* Content */}
      <div className={styles.content}>
        <div className={styles.mainSection}>
          {/* Logo Circle */}
          <div className={styles.logoContainer}>
            <div className={styles.logoCircle}>
              <svg className={styles.logoIcon} fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </div>
          </div>
          
          {/* Airline Text */}
          <div className={styles.textSection}>
            <h3 className={styles.airlineTitle}>QAirline</h3>
            <p className={styles.subtitle}>Customer</p>
            <div className={styles.underline}></div>
          </div>
        </div>
        
        {/* Member Info */}
        <div className={styles.memberInfo}>
          <div className={styles.memberDetails}>
            <span className={styles.memberLabel}>Thành viên</span>
          </div>
          
        </div>
        
        {/* Decorative elements */}
        <div className={styles.decorativeIcon}>
          <svg className={styles.decorativeIconSvg} fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
        
        {/* Additional decorative planes */}
        <div className={styles.floatingPlane1}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
        <div className={styles.floatingPlane2}>
          <svg fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
      </div>
    </div>
  );
}