import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { PortfolioItem } from '../types';
import toast from 'react-hot-toast';

export const usePortfolio = () => {
  const queryClient = useQueryClient();

  // Get all portfolio items
  const usePortfolioItems = (filters?: {
    category?: string;
    status?: string;
    featured?: boolean;
    page?: number;
    limit?: number;
  }) => {
    return useQuery({
      queryKey: ['portfolio', 'items', filters],
      queryFn: async () => {
        let query = supabase
          .from('portfolio_items')
          .select('*')
          .order('order', { ascending: true });

        if (filters?.category && filters.category !== 'all') {
          query = query.eq('category', filters.category);
        }

        if (filters?.status) {
          query = query.eq('status', filters.status);
        }

        if (filters?.featured !== undefined) {
          query = query.eq('is_featured', filters.featured);
        }

        if (filters?.page && filters?.limit) {
          const from = (filters.page - 1) * filters.limit;
          const to = from + filters.limit - 1;
          query = query.range(from, to);
        }

        const { data, error } = await query;
        
        if (error) throw error;
        return data as PortfolioItem[];
      },
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  // Get single portfolio item
  const usePortfolioItem = (id: string) => {
    return useQuery({
      queryKey: ['portfolio', 'item', id],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        return data as PortfolioItem;
      },
      enabled: !!id,
    });
  };

  // Get portfolio categories
  const usePortfolioCategories = () => {
    return useQuery({
      queryKey: ['portfolio', 'categories'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('portfolio_items')
          .select('category')
          .eq('status', 'published');
        
        if (error) throw error;
        
        const categories = [...new Set(data.map(item => item.category))];
        return categories;
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };

  // Create portfolio item
  const createPortfolioItem = useMutation({
    mutationFn: async (data: Omit<PortfolioItem, 'id' | 'created_at' | 'updated_at'>) => {
      const { data: result, error } = await supabase
        .from('portfolio_items')
        .insert([data])
        .select()
        .single();
      
      if (error) throw error;
      return result as PortfolioItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Portfolio item created successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to create portfolio item');
    },
  });

  // Update portfolio item
  const updatePortfolioItem = useMutation({
    mutationFn: async ({ 
      id, 
      data 
    }: { 
      id: string; 
      data: Partial<PortfolioItem> 
    }) => {
      const { data: result, error } = await supabase
        .from('portfolio_items')
        .update({ ...data, updated_at: new Date().toISOString() })
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return result as PortfolioItem;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Portfolio item updated successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to update portfolio item');
    },
  });

  // Delete portfolio item
  const deletePortfolioItem = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('portfolio_items')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Portfolio item deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete portfolio item');
    },
  });

  // Reorder portfolio items
  const reorderPortfolioItems = useMutation({
    mutationFn: async (items: { id: string; order: number }[]) => {
      const updates = items.map(item => 
        supabase
          .from('portfolio_items')
          .update({ order: item.order })
          .eq('id', item.id)
      );
      
      const results = await Promise.all(updates);
      const errors = results.filter(result => result.error);
      
      if (errors.length > 0) {
        throw new Error('Failed to reorder some items');
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portfolio'] });
      toast.success('Portfolio items reordered successfully!');
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to reorder portfolio items');
    },
  });

  return {
    usePortfolioItems,
    usePortfolioItem,
    usePortfolioCategories,
    createPortfolioItem: createPortfolioItem.mutate,
    updatePortfolioItem: updatePortfolioItem.mutate,
    deletePortfolioItem: deletePortfolioItem.mutate,
    reorderPortfolioItems: reorderPortfolioItems.mutate,
    isCreating: createPortfolioItem.isPending,
    isUpdating: updatePortfolioItem.isPending,
    isDeleting: deletePortfolioItem.isPending,
    isReordering: reorderPortfolioItems.isPending,
  };
};