'use client';

import { useState } from 'react';
import styles from "./accountInfo.module.scss";

interface AccountData {
  memberId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  gender: string;
  passport: string;
  birthDate: string;
}

interface InfoRowProps {
  label: string;
  value: string;
  field: keyof AccountData;
  type?: "text" | "email" | "tel" | "date" | "select";
  options?: string[];
}

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [accountData, setAccountData] = useState<AccountData>({
    memberId: 'JMUVz2qVUG2AXoNnV2VXZdq5g2',
    name: 'Duyen Nguyen',
    email: 'nguyenduyen.260903@gmail.com',
    phone: '',
    address: '',
    gender: 'Nam',
    passport: '',
    birthDate: ''
  });

  const [editData, setEditData] = useState<AccountData>({ ...accountData });

  const handleInputChange = (field: keyof AccountData, value: string) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setAccountData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...accountData });
    setIsEditing(false);
  };

  const InfoRow = ({ label, value, field, type = "text", options }: InfoRowProps) => (
    <div className={styles.infoRow}>
      <div className={styles.label}>{label}</div>
      {isEditing && field !== 'memberId' ? (
        <div className={styles.inputWrapper}>
          {type === "select" ? (
            <select
              className={styles.input}
              value={editData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
            >
              <option value="">Chọn...</option>
              {options?.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          ) : type === "date" ? (
            <input
              type="date"
              className={styles.input}
              value={editData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
            />
          ) : (
            <input
              type={type}
              className={styles.input}
              value={editData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={`Nhập ${label.toLowerCase()}`}
            />
          )}
        </div>
      ) : (
        <div className={styles.value}>
          {field === 'birthDate' && value ? 
            new Date(value).toLocaleDateString('vi-VN') : 
            (value || '-')
          }
        </div>
      )}
    </div>
  );

  return (
    <div className={styles.accountInfo}>
      <div className={styles.header}>
        <h2 className={styles.title}>Thông tin cá nhân</h2>
        {isEditing && (
          <div className={styles.editingIndicator}>
            <span className={styles.editingDot}></span>
            Đang chỉnh sửa
          </div>
        )}
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.leftColumn}>
          <InfoRow 
            label="Mã thẻ hội viên" 
            value={accountData.memberId} 
            field="memberId" 
          />
          <InfoRow 
            label="Email" 
            value={accountData.email} 
            field="email" 
            type="email" 
          />
          <InfoRow 
            label="Số điện thoại" 
            value={accountData.phone} 
            field="phone" 
            type="tel" 
          />
          <InfoRow 
            label="Ngày sinh" 
            value={accountData.birthDate} 
            field="birthDate" 
            type="date" 
          />
        </div>
        <div className={styles.rightColumn}>
          <InfoRow 
            label="Họ và tên" 
            value={accountData.name} 
            field="name" 
          />
          <InfoRow 
            label="Địa chỉ" 
            value={accountData.address} 
            field="address" 
          />
          <InfoRow 
            label="Giới tính" 
            value={accountData.gender} 
            field="gender" 
            type="select"
            options={['Nam', 'Nữ', 'Khác']}
          />
          <InfoRow 
            label="Số hộ chiếu" 
            value={accountData.passport} 
            field="passport" 
          />
        </div>
      </div>

      <div className={styles.updateBtnWrapper}>
        {isEditing ? (
          <div className={styles.actionButtons}>
            <button 
              className={styles.cancelBtn}
              onClick={handleCancel}
            >
              Hủy bỏ
            </button>
            <button 
              className={styles.saveBtn}
              onClick={handleSave}
            >
              Lưu thông tin
            </button>
          </div>
        ) : (
          <button 
            className={styles.updateBtn}
            onClick={() => setIsEditing(true)}
          >
            Cập nhật thông tin
          </button>
        )}
      </div>
    </div>
  );
}