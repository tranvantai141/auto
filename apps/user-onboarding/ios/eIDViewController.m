//
//  eIDViewController.m
//  UserOnboarding
//
//  Created by Kanwaljeet Singh on 21/02/23.
//

#import <Foundation/Foundation.h>
#import <React/RCTBridgeModule.h>

//MARK:- Bridge between React and Native modules and export module and method to be used in react-native
#if !TARGET_OS_SIMULATOR
@interface RCT_EXTERN_MODULE(eIDViewController, NSObject)
RCT_EXTERN_METHOD(callbackMethod:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getListCardReader:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isAppActivated:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(scanListDevies)
RCT_EXTERN_METHOD(connectCardReader:(NSString )cardName)
RCT_EXTERN_METHOD(disconnectCardReader:(NSString )disconnectCardReader)
RCT_EXTERN_METHOD(doActivated:(NSString )apiUrl:(NSString )customerId:(NSString )providerId:(NSString )branchId:(RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(isBLECardReader:(NSString )bankTransactionId:(NSInteger )bankAppId:(NSString )bankTransInfo:(NSInteger )bankTransType: (NSString )capturedImage: (RCTResponseSenderBlock)callback)
RCT_EXTERN_METHOD(getCardConnected:(RCTResponseSenderBlock)callback)
@end
#else

#endif
