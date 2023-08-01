import Foundation
import UIKit
import React
#if !targetEnvironment(simulator)
import MKIDBLE

@objc(eIDViewController)

class eIDViewController :RCTEventEmitter, BLEDeviceDelegate, BLEManageDelegate{
  func didDisconnectPeripheral() {
    
  }
  

//  var helper : MKIDBLEHelper = MKIDBLEHelper(appId: 23, providerSecret: "VCB4KhcyfTwVc9jUglyHSIiQCCOUh4z4")
  var helper : MKIDBLEHelper = MKIDBLEHelper(appId: 23, providerSecret: ENVConfig.mkKey)

  var deviceName = ""
  var deviceId = ""
  var deviceInfo = ""
  var listCardReader: [BLEDevice] = []
  var isAppActivatedSuccess = false
  var isAppActivatedFailure = false
//  var bleReader :  BLEReader!
  var bleDeviceSelected :  BLEDevice!
  var bleManager: BLEManager!

  override func supportedEvents() -> [String]! {
       return ["CardInfo", "Error","SODResult", "ShowLoading","HideLoading","DeviceConnected"]
   }
  
  func errorMessage(_ value: MKIDBLE.BLE_Error) {
    
    DispatchQueue.main.async {
      let errorInfo = ["description" : value.description,"code" : value.rawValue]
      // erro == 403 disconnect device and send noti to app
      if value.rawValue == 403 || value.rawValue == 30 {
        self.bleDeviceSelected = nil;
        DispatchQueue.main.async {
          self.sendEvent(withName: "DeviceConnected", body: "" )
              
            }
      }
      // dont't send when status code is state on
      if value.rawValue != 36 && (value.rawValue != 403 && value.rawValue != 30) {
        print("Chay vo day")
        self.sendEvent(withName: "Error", body: errorInfo)
      }
        }
    
      DispatchQueue.main.async {
        print("BLE error msg",value.description)
        print("BLE error raw",value.rawValue)
      }
      
    }
//
//    func getSODresult(_ value: MKIDBLE.BLE_Error) {
//      DispatchQueue.main.async {
//        let errorInfo = ["description" : value.description,"code" : value.rawValue]
//        self.sendEvent(withName: "SODResult", body: errorInfo)
//
//
//          }
//      DispatchQueue.main.async {
//        print("BLE error",value.description)
//      }
//    }
  
  func errorCreateFaceTemplate(_ value: MKIDBLE.ErrorTemplate) {
    DispatchQueue.main.async {
      let errorInfo = ["message" : value.message,"code" : value.code]
      // cmt tam
      if (Int(value.code) != 30 && Int(value.code) != 403) && Int(value.code) != 36 {
        self.sendEvent(withName: "Error", body: errorInfo)
      }
//      self.sendEvent(withName: "Error", body: errorInfo)
          
        }
      DispatchQueue.main.async {
        print("BLE errorCreateFaceTemplate msg",value.message)
        print("BLE errorCreateFaceTemplate raw",value.code)

      }
  }
  
  func getInfoCard(_ value: MKIDBLE.CardInfo, resultSOD: MKIDBLE.BLE_Error) {
    print("before dispatch  card info")
    let cardInfoDict = ["FullName" : value.FullName,"DOB" : value.DOB , "Gender": value.Gender, "Nationality":value.Nationality ,"Hometown":value.Hometown , "Resident":value.Resident , "DDND": value.DDND , "ValidDate" : value.ValidDate , "ExpiredDate" : value.ExpiredDate, "OldIDNumber": value.OldIDNumber , "transactionId": value.transactionId , "IDNumber": value.IDNumber, "FaceImage": value.imageData?.base64EncodedString(options: [])]
    print("cardInfoDict:1111" ,cardInfoDict)
    print("cardInfoDict:value" ,value)
    DispatchQueue.main.async {
      
      self.sendEvent(withName: "CardInfo", body: cardInfoDict)
          
        }
    
    DispatchQueue.main.async {
      let errorInfo = ["code" : resultSOD]
      print("errorInfo1111:", errorInfo)
      self.sendEvent(withName: "SODResult", body: resultSOD)

          
        }
    DispatchQueue.main.async {
      print("BLE error",value.description)
    }
  }
  
  func showListDevices(value: [MKIDBLE.BLEDevice]) {
    self.listCardReader = value
    print("MKIDBLE.showListDevices",value)
    print("self.listCardReader1111:", self.listCardReader)
//    if(self.listCardReader.count > 0) {
//      bleManager.connectDevice(self.listCardReader[0])
//    }
  }
  
  func deviceConnected(device: MKIDBLE.BLEDevice) {
    print("MKIDBLE.deviceConnected",device.name)
    
    self.bleDeviceSelected = device
    self.bleDeviceSelected.delegate = self
    
    //send event to Rn device connected
    
    DispatchQueue.main.async {
      self.sendEvent(withName: "DeviceConnected", body: device.name )
          
        }
  }
  
  func state(_ value: MKIDBLE.BLE_Error) {
    print("MKIDBLE.state",value)
  }
    
//    func getInfoCard(_ value: MKIDBLE.CardInfo) {
//      print("before dispatch  card info")
//      let cardInfoDict = ["FullName" : value.FullName,"DOB" : value.DOB , "Gender": value.Gender, "Nationality":value.Nationality ,"Hometown":value.Hometown , "Resident":value.Resident , "DDND": value.DDND , "ValidDate" : value.ValidDate , "ExpiredDate" : value.ExpiredDate, "OldIDNumber": value.OldIDNumber , "transactionId": value.transactionId , "IDNumber": value.IDNumber]
//      DispatchQueue.main.async {
//        self.sendEvent(withName: "CardInfo", body: cardInfoDict)
//
//          }
//    }
    
    func showLoading() {
      DispatchQueue.main.async {
        self.sendEvent(withName: "ShowLoading", body: "ShowLoading")
            
          }
    }
  func hideLoading() {
    
    DispatchQueue.main.async {
      self.sendEvent(withName: "HideLoading", body: "HideLoading")
          
        }
    }
    
  
  func getdeviceInformation() {
    getDeviceId()
    getDeviceName()
  }
  
  func initBleReader() {
    self.bleManager = BLEManager(bankTransactionId: "", andBankAppId: 23, andBankTransInfo: "", andBankTransType: 198, delegate: self)
//    bleReader.delegate = self
    
  }
  
  //MARK:- A function to check weather app is activated or not
  @objc(isAppActivated:)
  func isAppActivated (callback: @escaping RCTResponseSenderBlock) -> Void {
    helper.checkAppActivated { isActivated in
      if isActivated {
        self.isAppActivatedSuccess = isActivated
//        self.showListDevices(value: [])
        let resultSuccessDict = ["activationStatus" : self.isAppActivatedSuccess] as [String : Any];
        callback([NSNull() ,resultSuccessDict])
      } else {
        print("isAppActivatedStatus", isActivated)

        self.isAppActivatedFailure = isActivated
        let failureSuccessDict = ["activationStatus" : self.isAppActivatedFailure] as [String : Any];
        callback([NSNull() ,failureSuccessDict])
      }
    } errorHandler: { error in
      DispatchQueue.main.async {
        print("error isAppActivated", error.description)
        print("raw  isAppActivated", error.rawValue)

        let failureSuccessDict = ["activatedFailure" : false] as [String : Any];
        callback([NSNull() ,failureSuccessDict])
      }
    }
  }
  
  @objc(doActivated:::::)
  func doActivated(apiUrl:String,customerId:String,providerId:String,branchId:String,callback: @escaping RCTResponseSenderBlock) {
    print("doActivatedfunctioncall")

//    helper.doActivate(url: apiUrl, andCustomerId: customerId, andProviderId: providerId, andBranchId: branchId) {
//      print("argument data", self.url, customerId, providerId, branchId)
//      let resultSuccessDict = ["activationStatus" : true] as [String : Any];
//      callback([NSNull() ,resultSuccessDict])
//    }andFailureHandler: { (err) in
//      DispatchQueue.main.async {
//        let failureSuccessDict = ["activationStatus" : false] as [String : Any];
//        callback([NSNull() ,failureSuccessDict])
//      }
//    } errorHandler: { (err) in
//      DispatchQueue.main.async {
//        let failureSuccessDict = ["activationError" : true] as [String : Any];
//        callback([NSNull() ,failureSuccessDict])
//      }
//    }
    helper.doActivate(url: apiUrl, andCustomerId: customerId, andBranchId: providerId) {

      let resultSuccessDict = ["activationStatus" : true] as [String : Any];
      callback([NSNull() ,resultSuccessDict])
    } andFailureHandler: { (err) in
      DispatchQueue.main.async {
        let failureSuccessDict = ["activationStatus" : false] as [String : Any];
        callback([NSNull() ,failureSuccessDict])
      }
    } errorHandler: { (err) in
      DispatchQueue.main.async {
        let failureSuccessDict = ["activationError" : true] as [String : Any];
        callback([NSNull() ,failureSuccessDict])
      }
    }
  }
  
  func processImage(imageUri: String)-> UIImage? {
      if let imageUrl = URL(string: imageUri), let imageData = try? Data(contentsOf: imageUrl) {

        return UIImage(data: imageData)

      }
    return nil
    }
  //MARK:- BLE Card reader method
  @objc(isBLECardReader::::::)
  func isBLECardReader (bankTransactionId: String, bankAppId: NSInteger, bankTransInfo: String, bankTransType: NSInteger,capturedImage: String, callback: @escaping RCTResponseSenderBlock) -> Void {
    print("BLECardReaderfunctionCall" , capturedImage)
    self.bleManager = BLEManager(bankTransactionId: bankTransactionId, andBankAppId: Int32(bankAppId), andBankTransInfo: bankTransInfo, andBankTransType: Int32(bankTransType), delegate: self)
    self.bleDeviceSelected.checkReader { result in
      print("resultcheckReader: ", result)
    }
    DispatchQueue.main.asyncAfter(deadline: .now() + 2.0){
      if let image = self.processImage(imageUri: capturedImage) {
          // use the image
        
        self.bleDeviceSelected.readIdInfo(image: image)

      } else {
          // handle the case when image is nil
        print("no image found ")

      }
       }
  }
  
  func getDvInfo() -> String {
    helper.getDeviceInfoForRegisterDevice(serverUrl: "\(ENVConfig.mkUrl)/api/") { res in
      self.deviceInfo  = res
        print("resssss",res)
    } errorHandlerSDK: { err1 in
//        self.showAlert("\(err1.localizedDescription)")
    } errorHandler: { err2 in
//        self.showAlert("\(err2.rawValue)")
    }
    return self.deviceInfo
  }
  
  func getDeviceName()-> String {
    helper.getDeviceName { value in
      self.deviceName = value
    } errorHandler: { err in
      print("err",err.rawValue)
    }
    return self.deviceName

  }
  
  func getDeviceId()-> String {
    helper.getDeviceId { id in
      self.deviceId  = id
      print("deviceId",id)
    } errorHandler: { err in
      print("err",err.rawValue)
    }
    return self.deviceId
  }
  
  
  @objc(callbackMethod:)
  func callbackMethod(callback: RCTResponseSenderBlock) -> Void {
    self.initBleReader()
    let resultsDict = ["deviceId" : getDeviceId(),"deviceName" : getDeviceName(), "deviceInfo" : getDvInfo()] as [String : Any];
    print( "deviceId = ",getDeviceId(),"deviceName = ",getDeviceName())
    callback([NSNull() ,resultsDict])
    
  }
  
  @objc(scanListDevies)
  func scanListDevies() -> Void {
    bleManager.scanListDevice()
  }
  
  @objc(getListCardReader:)
  func getListCardReader(callback: RCTResponseSenderBlock) -> Void {
    var lstDevice = [String]()
    for item in self.listCardReader {
      lstDevice.append(item.name)
    }
    let resultsDict = ["listCardReader" : lstDevice] as [String : Any];
    callback([NSNull() ,resultsDict])
  }
  
  @objc(connectCardReader:)
  func connectCardReader(cardName:String) {
   
    let index = self.listCardReader.firstIndex { $0.name == cardName }
    print("cardNameSelect:", cardName)
    if (bleDeviceSelected != nil) {
      self.bleManager.disconnect()
    }
    if let index = index {
        print("Found item at index \(index)")
      let cardSelect = self.listCardReader[index];
      
      DispatchQueue.main.asyncAfter(deadline: .now() + 1.0){
        self.bleManager.connectDevice(cardSelect)
      }
      
      
    } else {
        print("Item not found in array")
    }
  }
  
  @objc(disconnectCardReader:)
  func disconnectCardReader(cardName: String) {
    self.bleManager.disconnect()
    self.bleDeviceSelected = nil
  }
  
  @objc(getCardConnected:)
  func getCardConnected(callback: RCTResponseSenderBlock) -> Void {
    
    let resultsDict = ["cardSelected" : (self.bleDeviceSelected != nil) ? self.bleDeviceSelected.name : ""] as [String : Any];
    callback([NSNull() ,resultsDict])
  }
}
#endif
