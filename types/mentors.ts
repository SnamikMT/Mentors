export interface MentorShort {
  id: number;
  name: string;
  subtitle?: string;
  avatar?: string;
  price?: number;       // в копейках/центах или в рублях — оговорите с бэком
  tags?: string[];
}

export interface MentorDetails extends MentorShort {
  shots?: string[];
  helpWith?: string[];
  achievements?: string[];
  aboutShort?: string;
  aboutLong?: string;
}
