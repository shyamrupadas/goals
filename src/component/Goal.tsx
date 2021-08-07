import React from 'react';
import { Button } from 'reactstrap';
import GoalItem from './GoalItem'
import { GoalsType } from '../types/types';

type PropsType = {
  goalName: string
  deleteGoal: (id: string) => void
  moveGoalUp: (id: string) => void
  moveGoalDown: (id: string) => void
  changeGoal: (goalItem: GoalsType) => void
}

const Goal: React.FC<PropsType & GoalsType> = ({
                                                 id, goalName, units, goalValue, currentValue,
                                                 deleteGoal, moveGoalUp, moveGoalDown, changeGoal
                                               }) => {

  // формирую объект с актуальным объектом goal, для изменения в setGoals
  const makeGoal = (itemValue: string | number, itemKey: string): any => {
    const goal = {
      id: id,
      goalName: goalName,
      units: units,
      goalValue: goalValue,
      currentValue: currentValue
    };

    switch (itemKey) {
      case 'goalName':
        return {
          ...goal,
          goalName: itemValue
        };
      case 'units':
        return {
          ...goal,
          units: itemValue
        };
      case 'goalValue':
        return {
          ...goal,
          goalValue: itemValue
        };
      case 'currentValue':
        return {
          ...goal,
          currentValue: itemValue
        };
      default:
        return {
          ...goal
        }
    }

  };

  const changeGoalItem = (goalItem: any, itemKey: string) => {
    const goal = makeGoal(goalItem, itemKey)
    changeGoal(goal);
  };

  const progressValue = Math.round(currentValue / goalValue * 100)

  return (
    <tr>
      <GoalItem itemKey={'goalName'} goalItemProp={goalName} changeGoalItem={changeGoalItem}/>
      <GoalItem itemKey={'units'} goalItemProp={units} changeGoalItem={changeGoalItem}/>
      <GoalItem itemKey={'goalValue'} goalItemProp={goalValue} changeGoalItem={changeGoalItem}/>
      <GoalItem itemKey={'currentValue'} goalItemProp={currentValue} changeGoalItem={changeGoalItem}/>
      <td>{progressValue ? progressValue + '%' : '-'}</td>
      <td><Button outline color="secondary" size="sm" onClick={() => deleteGoal(id)}>x</Button></td>
      <td onClick={() => moveGoalUp(id)}>&#8593;</td>
      <td onClick={() => moveGoalDown(id)}>&#8595;</td>
    </tr>
  );
};

export default Goal;