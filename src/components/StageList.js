// components/StageList.js
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Skeleton } from './ui/skeleton';
import { toast } from 'sonner';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/app/api';
import Image from 'next/image';
import { PencilIcon, Trash} from 'lucide-react';

const SortableItem = ({ stage }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: String(stage.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-4 rounded shadow mb-2 cursor-grab border-l-4 border-blue-500"
    >
      <div className="font-semibold text-lg">{stage.stageName}</div>
      <div className="text-sm text-gray-600">{stage.description}</div>
      <div className="text-xs text-blue-600 mt-1">Status: {stage.status}</div>
    </div>
  );
};

const StageList = ({ assetId }) => {
  const [stages, setStages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitNewStage, setSubmitNewStage] = useState([]);
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Fetch stages by asset ID
//   useEffect(() => {
//     const fetchStages = async () => {
//       try {
//         const res = await api.get(
//           `/stage/${assetId}`
//         );
//         const fetchedStages = res.data?.data?.stages || [];
//         setStages(fetchedStages);
//       } catch (err) {
//         console.error('Error fetching stages:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchStages();
//   }, [assetId]);

 const fetchStages = async () => {
    try {
      const res = await api.get(
        `/stage/${assetId}`
      );
      const fetchedStages = res.data?.data?.stages || [];
      console.log("Fetched Stages:", fetchedStages);
      setStages(fetchedStages);
    } catch (err) {
      console.error('Error fetching stages:', err);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
  if (assetId) fetchStages();
}, [assetId]);

const SortableItem = ({ stage }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: String(stage.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className='flex flex-col justify-betwween'>
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="bg-white p-2 flex justify-between items-center rounded shadow mb-2 w-[400px] gap-x-4 cursor-grab"
    >
      <div>{stage.stagePosition}</div>
      <div className="font-semibold text-xs w-20">{stage.stageName}</div>
      <div className="text-xs text-gray-600 w-20 truncate">{stage.description}</div>
      {/* <div className="text-xs text-blue-600 mt-1">Status: {stage.status}</div> */}
      <div className='flex items-center justify-center gap-x-2 cursor-pointer'>
        <PencilIcon size={18} className='cursor-pointer'/>
        <Trash className='cursor-pointer' size={15} />
      </div>
    </div>

    </div>
  );
};


  // Handle reorder and API sync
  // const handleDragEnd = async ({ active, over }) => {
  //   if (!over || active.id === over.id) return;

  //   const oldIndex = stages.findIndex((s) => s.id === active.id);
  //   const newIndex = stages.findIndex((s) => s.id === over.id);

  //   const reordered = arrayMove(stages, oldIndex, newIndex);
  //   setStages(reordered);

  //   const payload = {
  //     stageUpdates: reordered.map((stage, index) => ({
  //       id: stage.id,
  //       stagePosition: index + 1,
  //     })),
  //   };

  //   try {
  //    const response= await api.post(
  //       '/stage/manage-stages',
  //       payload
  //     );
  //     console.log(response.data)
  //     console.log('Stage order saved');
  //     toast.success('Stage Order Saved')
  //   } catch (err) {
  //     console.error('Error saving stage order:', err);
  //   }
  // };

    const handleDragEnd = async ({ active, over }) => {
    if (!over || active.id === over.id) return;

    const oldIndex = stages.findIndex((s) => s.id === active.id);
    const newIndex = stages.findIndex((s) => s.id === over.id);

    const reordered = arrayMove(stages, oldIndex, newIndex);
    setStages(reordered);

    const payload = {
      stageUpdates: reordered.map((stage, index) => ({
        id: stage.id,
        stagePosition: index + 1,
      })),
    };

    setSubmitNewStage(payload);

    // try {
    //  const response= await api.post(
    //     '/stage/manage-stages',
    //     payload
    //   );
    //   console.log(response.data)
    //   console.log('Stage order saved');
    //   toast.success('Stage Order Saved')
    // } catch (err) {
    //   console.error('Error saving stage order:', err);
    // }
  };
  
  const handleSubmit = async () => {
    try {
      const response = await api.post('/stage/manage-stages', submitNewStage);
      console.log(response.data);
      toast.success('Stage Order Saved');
      fetchStages(); // Refresh stages after saving
    } catch (err) {
      console.error('Error saving stage order:', err);
      toast.error('Failed to save stage order');
    }
  };



  if (loading) return <div className='w-full h-32 px-4 shadow-md gap-x-6 items-center flex'>
                <Skeleton className="rounded-full w-96 h-10 bg-[#eee]" />
                <div className='flex flex-col w-full gap-y-3'>
                  <Skeleton className='w-full bg-[#eee] h-5' />
                  <Skeleton className='w-full bg-[#eee] h-5' />
                </div>
              </div>;
  if (stages.length === 0) return <p>No stages found.</p>;

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={stages.map((s) => s.id)} strategy={verticalListSortingStrategy}>
        {stages.map((stage) => (
              <SortableItem key={stage.id} stage={stage} />
        ))}
      </SortableContext>
      <div className='flex justify-end mt-4'>
          <button onClick={() => handleSubmit()}  className="bg-blue-500 cursor-pointer text-white px-4 py-2 rounded mt-2" > 
            Save Order
          </button>
      </div>
    </DndContext> 
  );
};

export default StageList;
