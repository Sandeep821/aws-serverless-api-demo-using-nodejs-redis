
export class dataService {
    public getDataByIdFromObj(idKey: any, dataArray: any) {
        console.log('getDataById', idKey);
        for (var i=0; i < dataArray.length; i++) {
            if (dataArray[i].id == idKey) {
                return dataArray[i];
            }
        }
    }

    public saveUserData = (data:any, resId:any) => {
       const id = {id:resId}
       const userPosteData = JSON.stringify(data);
       console.log('userPosteData', userPosteData);
            const userData = Object.assign(JSON.stringify(data), id);
           this.userPostedData.push(userData);
            console.log('userData', this.userPostedData);
        }

    public userPostedData:any = [
        {
        id: 111,
        modle : 'Atlas',
        msrp: 1111
      },   {
        id: 222,
        modle : 'Golf',
        msrp: 2222
      }];
}

export default new dataService();
