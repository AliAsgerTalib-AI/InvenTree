export interface InventoryItem {
  id: string;
  room: string;
  category: string;
  description: string;
  purchaseDate: string;
  price: number;
}

export interface Category {
  id: string;
  label: string;
  description: string;
  icon?: string; // Icon name string
  color: string;
}

export interface PropertyDetails {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  type: 'Bungalow' | 'Row House' | 'Room' | 'Studio' | 'Condo' | 'Storage Unit' | 'Commercial';
}

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  age?: number;
}

export interface OwnerDetails {
  primaryOwner: {
    name: string;
    email: string;
    phone: string;
  };
  familyMembers: FamilyMember[];
}

export const formatDate = (dateString: string) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
