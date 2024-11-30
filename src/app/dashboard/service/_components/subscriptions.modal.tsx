'use client';

import { RocketIcon } from '@radix-ui/react-icons';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { createSubscription } from '@/actions/subscriptions/add-subscriptions';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Service } from '@/types/service';

interface SubscriptionModalProps {
	serviceId: number;
	sessionToken: string;
	setServices: React.Dispatch<React.SetStateAction<Service[]>>;
	fetchServices: () => void; 
	setUpdatingServiceId: React.Dispatch<React.SetStateAction<number | null>>;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ serviceId, sessionToken, setServices, fetchServices, setUpdatingServiceId }) => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedPlanId, setSelectedPlanId] = useState<number | null>(null);
	const [loading, setLoading] = useState(false);

	const availablePlans = [
		{ id: 1, name: 'Basic Plan' },
		{ id: 2, name: 'Premium Plan' },
		{ id: 3, name: 'Pro Plan' },
	];

	const handleSubscription = async () => {
		if (selectedPlanId === null) {
			toast.error('Please select a plan!');
			return;
		}

		setLoading(true);
		setUpdatingServiceId(serviceId); 

		try {
			const response = await createSubscription(sessionToken, { service_id: serviceId, plan_id: selectedPlanId });

			if (response?.subscription) {
				toast.success('Subscription added successfully!');
				setIsDialogOpen(false);

				setServices((prevServices) => prevServices.map((service) => (service.id === serviceId ? { ...service, subscription: response.subscription } : service)));

				fetchServices();
			} else {
				toast.error('Failed to create subscription.');
			}
		} catch (error) {
			console.error('Error creating subscription:', error);
			toast.error('Error creating subscription.');
		} finally {
			setLoading(false);
			setUpdatingServiceId(null); 
		}
	};

	return (
		<>
			<Button size='sm' type='button' onClick={() => setIsDialogOpen(true)} disabled={loading}>
				<RocketIcon className='h-4 w-4' />
			</Button>

			<AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Select Subscription Plan</AlertDialogTitle>
						<AlertDialogDescription>Choose a plan to subscribe to for this service.</AlertDialogDescription>
					</AlertDialogHeader>

					<div className='space-y-4'>
						{availablePlans.map((plan) => (
							<div key={plan.id} className='flex items-center gap-2'>
								<input type='radio' id={`plan-${plan.id}`} name='subscription-plan' checked={selectedPlanId === plan.id} onChange={() => setSelectedPlanId(plan.id)} />
								<label htmlFor={`plan-${plan.id}`} className='cursor-pointer'>
									{plan.name}
								</label>
							</div>
						))}
					</div>

					<div className='flex justify-end gap-4 mt-4'>
						<AlertDialogCancel onClick={() => setIsDialogOpen(false)} disabled={loading}>
							Cancel
						</AlertDialogCancel>
						<AlertDialogAction onClick={handleSubscription} disabled={loading}>
							{loading ? <span>Loading...</span> : 'Subscribe'}
						</AlertDialogAction>
					</div>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
};

export default SubscriptionModal;
