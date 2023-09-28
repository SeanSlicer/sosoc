import { type SESV2 } from "aws-sdk"

import { env } from "@/src/env.mjs"
import { SES } from "@/lib/client/aws"

export const sendEmail = (params: SESV2.SendEmailRequest): Promise<void> => {
  return new Promise((resolve, reject) => {
    SES.sendEmail(params, (err) => {
      if (err) {
        console.error(err)
        reject("Failed to send email")
      } else {
        resolve()
      }
    })
  })
}

export const sendBulkEmail = (
  params: SESV2.SendBulkEmailRequest
): Promise<void> => {
  return new Promise((resolve, reject) => {
    SES.sendBulkEmail(params, (err) => {
      if (err) {
        console.error(err)
        reject("Failed to send email")
      } else {
        resolve()
      }
    })
  })
}

export const getCurrentUrl = () => {
  return `${env.NEXT_PUBLIC_APP_URL ?? "https://sosoc.net"}`
}