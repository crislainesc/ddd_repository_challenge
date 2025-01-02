import Address from './address';

export default class Customer {
  private _id: string;
  private _name: string;
  private _address!: Address;
  private _active: boolean;
  private _rewardPoints: number;

  constructor(id: string, name: string, rewardPoints: number = 0) {
    this._id = id;
    this._name = name;
    this._active = false;
    this._rewardPoints = rewardPoints;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }

  get rewardPoints() {
    return this._rewardPoints;
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('Id is required');
    }
    if (this._name.length === 0) {
      throw new Error('Name is required');
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  isActive() {
    return this._active === true;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error('Address is mandatory to activate a customer');
    }

    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  changeAddress(address: Address) {
    this._address = address;
  }
}
