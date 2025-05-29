// src/app/account/page.tsx

import styles from "./acc_page.module.scss";
import ProfileCard from '../../components/my_account/ProflieCard/profileCard';
import AccountInfo from '../../components/my_account/AccountInfo/accountInfo';

export default function AccountPage() {
  return (
    <div className={styles.accountContainer}>
        <div className={styles.infoSection}>
          {/* Profile Card */}
          <div className={styles.profileCardWrapper}>
            <ProfileCard />
          </div>
          {/* Account Information */}
          <div className={styles.accountInfoWrapper}>
            <AccountInfo />
          </div>
        </div>
    </div>
    
  );
}