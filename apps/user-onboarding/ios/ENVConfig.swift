//
//  ENVConfig.swift
//  UserOnboarding
//
//  Created by Edward on 06/06/2023.
//

import Foundation

// read from RNCConfig
struct ENVConfig {
  static var env: String {
    return RNCConfig.env(for: "ENV")
  }
  
  static var mkKey: String {
    return RNCConfig.env(for: "MK_KEY")
  }
  
  static var mkUrl: String {
    return RNCConfig.env(for: "MK_URL")
  }
}
