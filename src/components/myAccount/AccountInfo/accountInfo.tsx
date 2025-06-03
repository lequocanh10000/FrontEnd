"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import styles from "./accountInfo.module.scss";
import { userService, UserData } from "../../../api/services/userService";
import { toast } from "react-toastify";
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface AccountData {
  memberId: string;
  username: string;
  email: string;
  phone: string;
}

interface InfoRowProps {
  label: string;
  value: string;
  field: keyof AccountData;
  type?: "text" | "email" | "tel";
  isEditing: boolean;
  onInputChange: (field: keyof AccountData, value: string) => void;
}

// Tách InfoRow thành component riêng để tránh re-create
const InfoRow = ({
  label,
  value,
  field,
  type = "text",
  isEditing,
  onInputChange,
}: InfoRowProps) => (
  <div className={styles.infoRow}>
    <div className={styles.label}>{label}</div>
    {isEditing && field !== "memberId" ? (
      <div className={styles.inputWrapper}>
        <input
          type={type}
          className={styles.input}
          value={value || ""}
          onChange={(e) => onInputChange(field, e.target.value)}
          placeholder={`Nhập ${label.toLowerCase()}`}
        />
      </div>
    ) : (
      <div className={styles.value}>{value || "-"}</div>
    )}
  </div>
);

export default function AccountInfo() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [accountData, setAccountData] = useState<AccountData>({
    memberId: "",
    username: "",
    email: "",
    phone: "",
  });

  const [editData, setEditData] = useState<AccountData>({ ...accountData });
  
  // Lấy token và user từ Redux store
  const { token, user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!token || !user) {
          router.push("/login");
          return;
        }

        const userData = await userService.getUserInfo(token);
        console.log("userData from account Info", userData);
        const newAccountData = {
          memberId: userData.id || "",
          username: userData.username || "",
          email: userData.email || "",
          phone: userData.phone || "",
        };

        setAccountData(newAccountData);
        setEditData(newAccountData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Không thể tải thông tin người dùng");
      }
    };

    fetchUserData();
  }, [router, token, user]);

  // Sử dụng useCallback để tránh tạo function mới mỗi lần render
  const handleInputChange = useCallback(
    (field: keyof AccountData, value: string) => {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    },
    []
  );

  const handleSave = async () => {
    try {
      setIsLoading(true);
      if (!token || !user) {
        router.push("/login");
        return;
      }

      const userData: Partial<UserData> = {
        username: editData.username,
        email: editData.email,
        phone: editData.phone,
      };
      console.log("after edit", userData)

      await userService.updateUserInfo(userData, token);
      setAccountData({ ...editData });
      setIsEditing(false);
      toast.success("Cập nhật thông tin thành công");
    } catch (error: any) {
      console.error("Error updating user data:", error);
      toast.error(
        error.response?.data?.message || "Không thể cập nhật thông tin"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditData({ ...accountData });
    setIsEditing(false);
  };

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
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
          <InfoRow
            label="Email"
            value={isEditing ? editData.email : accountData.email}
            field="email"
            type="email"
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </div>
        <div className={styles.rightColumn}>
          <InfoRow
            label="Tên người dùng"
            value={isEditing ? editData.username : accountData.username}
            field="username"
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
          <InfoRow
            label="Số điện thoại"
            value={isEditing ? editData.phone : accountData.phone}
            field="phone"
            type="tel"
            isEditing={isEditing}
            onInputChange={handleInputChange}
          />
        </div>
      </div>

      <div className={styles.updateBtnWrapper}>
        {isEditing ? (
          <div className={styles.actionButtons}>
            <button
              className={styles.cancelBtn}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Hủy bỏ
            </button>
            <button
              className={styles.saveBtn}
              onClick={handleSave}
              disabled={isLoading}
            >
              {isLoading ? "Đang lưu..." : "Lưu thông tin"}
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
