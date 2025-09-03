
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCreateBooking } from '@/hooks/useDashboardData';
import { toast } from 'sonner';

interface AddBookingFormProps {
  onSuccess?: () => void;
}

const AddBookingForm = ({ onSuccess }: AddBookingFormProps) => {
  const [formData, setFormData] = useState({
    booking_type: 'consultation',
    scheduled_at: '',
    duration_minutes: 60,
    client_name: '',
    client_email: '',
    status: 'scheduled'
  });

  const createBooking = useCreateBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.scheduled_at || !formData.client_name) {
      toast.error('Please fill in required fields');
      return;
    }

    try {
      await createBooking.mutateAsync(formData);
      toast.success('Booking created successfully!');
      setFormData({
        booking_type: 'consultation',
        scheduled_at: '',
        duration_minutes: 60,
        client_name: '',
        client_email: '',
        status: 'scheduled'
      });
      onSuccess?.();
    } catch (error) {
      toast.error('Failed to create booking');
      console.error('Error creating booking:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="client_name">Client Name *</Label>
          <Input
            id="client_name"
            value={formData.client_name}
            onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
            placeholder="Client name"
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
            placeholder="Client email"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Duration (minutes)</Label>
          <Input
            id="duration"
            type="number"
            value={formData.duration_minutes}
            onChange={(e) => setFormData(prev => ({ ...prev, duration_minutes: parseInt(e.target.value) }))}
            min="15"
            max="240"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <Label>Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="scheduled">Scheduled</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="no_show">No Show</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={createBooking.isPending}>
        {createBooking.isPending ? 'Creating...' : 'Create Booking'}
      </Button>
    </form>
  );
};

export default AddBookingForm;
