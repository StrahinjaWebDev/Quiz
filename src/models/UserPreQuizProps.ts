export interface UserPreQuizProps {
  selectedCard: {
    id: string;
    name: string;
    time: number;
    category: string;
    active: boolean;
    description: string;
  };
}
