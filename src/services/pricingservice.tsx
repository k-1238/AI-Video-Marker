import { useMutation, UseMutationResult } from '@tanstack/react-query';
import axios from 'axios';

interface PostUserPricingVariables {
  email: string;
  priceId: string;
}

interface UsePostUserPricingProps {
  onSuccess?: (data: any) => void;
  onError?: (error: unknown) => void;
}

export const usePostUserPricing = ({ onSuccess }: UsePostUserPricingProps): UseMutationResult<any, unknown, PostUserPricingVariables> => {
  const postUserPricing = async ({ email, priceId }: PostUserPricingVariables): Promise<any> => {
    const response = await axios.put('http://localhost:3000/api/price/updateuserpricing', { email, priceId });
    return response.data;
  };

  return useMutation({
    mutationFn: postUserPricing,
    onSuccess,
    onError: (err) => {
      console.log("Something wrong ", err)
    },
  });
};
