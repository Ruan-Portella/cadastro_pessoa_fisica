import TrashIcon from '../assets/TrashIcon';
import EditIcon from '../assets/EditIcon';
import { useNavigate } from 'react-router-dom';

interface OperationCardProps {
  user: { id: string },
  deleteUser: (id: string) => void
}

export default function OperationCard({ user, deleteUser }: OperationCardProps) {
  const navigate = useNavigate();

  return (
    <div className='flex justify-center'>
      <span
        onClick={(e) => { e.stopPropagation(); navigate(`/user/${user.id}`) }}>
          <EditIcon className={`hover:fill-gray-600 group-hover:stroke-[white] w-7 h-7 hover:scale-125`}/>
      </span>
      <span className='mx-2'>|</span>
      <span
        onClick={(e) => { e.stopPropagation(); deleteUser(user.id) }}>
          <TrashIcon className={`hover:fill-[#F15156] group-hover:stroke-[white] w-7 h-7 hover:scale-125`} />
      </span>
    </div>
  )
}
