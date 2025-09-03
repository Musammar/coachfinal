
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateBooking } from '@/hooks/useDashboardData';
import { toast } from 'sonner';
import { Plus } from 'lucide-react';

interface AddBookingDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onBookingAdded?: () => void;
}

const AddBookingDialog: React.FC<AddBookingDialogProps> = ({ 
  children, 
  open: externalOpen, 
  onOpenChange: externalOnOpenChange,
  onBookingAdded 
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    booking_type: 'consultation',
    scheduled_at: '',
    duration_minutes: 60,
    status: 'scheduled'
  });

  const createBooking = useCreateBooking();

  // Use external state if provided, otherwise use internal state
  const isOpen = externalOpen !== undefined ? externalOpen : internalOpen;
  const setOpen = externalOnOpenChange || setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name || !formData.scheduled_at) {
      toast.error('Client name and scheduled time are required');
      return;
    }

    try {
      await createBooking.mutateAsync({
        ...formData,
        scheduled_at: new Date(formData.scheduled_at).toISOString()
      });
      toast.success('Booking created successfully!');
      setOpen(false);
      setFormData({
        client_name: '',
        client_email: '',
        booking_type: 'consultation',
        scheduled_at: '',
        duration_minutes: 60,
        status: 'scheduled'
      });
      onBookingAdded?.();
    } catch (error) {
      toast.error('Failed to create booking');
      console.error(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Booking
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Booking</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client_name">Client Name *</Label>
            <Input
              id="client_name"
              value={formData.client_name}
              onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
              placeholder="Enter client name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="client_email">Client Email</Label>
            <Input
              id="client_email"
              type="email"
              value={formData.client_email}
              onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
              placeholder="Enter client email"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Booking Type</Label>
            <Select value={formData.booking_type} onValueChange={(value) => setFormData(prev => ({ ...prev, booking_type: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="consultation">Consultation</SelectItem>
                <SelectItem value="coaching_session">Coaching Session</SelectItem>
                <SelectItem value="follow_up">Follow Up</SelectItem>
                <SelectItem value="discovery_call">Discovery Call</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="scheduled_at">Scheduled Date & Time *</Label>
            <Input
              id="scheduled_at"
              type="datetime-local"
              value={formData.scheduled_at}
              onChange={(e) => setFormData(prev => ({ ...prev, scheduled_at: e.target.value }))}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="duration_minutes">Duration (minutes)</Label>
            <Input
              id="duration_minutes"
              type="number"
              value={formData.duration_minutes}
              onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
              min="15"
              max="480"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={createBooking.isPending}>
              {createBooking.isPending ? 'Creating...' : 'Create Booking'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBookingDialog;
