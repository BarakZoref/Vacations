import { useSelector } from 'react-redux';
import { AppState } from '../../redux/app-state';
import Card from '../card/Card';
import { IVacation } from '../../models/IVacation';
import './CardsContainer.css';

export default function CardsContainer() {


  const vacationsMap = useSelector((state: AppState) => state.vacationsMap);
  const currentUser = useSelector((state: AppState) => state.currentUser);

  let currentUserVacationsArray: number[] = [];

  vacationsMap.forEach((vacation: IVacation) => {
    currentUserVacationsArray.push(vacation.id);
  });

  currentUserVacationsArray.sort((vacationIdA, vacationIdB) => {
    if (currentUser.followedVacations.has(vacationIdA) === currentUser.followedVacations.has(vacationIdB)) {
        return 0;
    }
    if(currentUser.followedVacations.has(vacationIdA)) {
        return -1;
    }
    return 1;
});

  return (
    <div className="cards-container">
      <div className="cards-div">
        {currentUserVacationsArray.map((vacationId: number, index: number) =>
        (<Card key={index} vacation={vacationsMap.get(vacationId) as IVacation} />
        ))}
      </div>
    </div>
  )
}

