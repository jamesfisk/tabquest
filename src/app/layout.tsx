import Nav from '@/components/nav'
import './globals.css'
import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'
import Script from 'next/script'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'TabQuest',
  description: 'Begin your TabQuest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <Script id='posthog-init'>
          {
            `!function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.async=!0,p.src=s.api_host+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="capture identify alias people.set people.set_once set_config register register_once unregister opt_out_capturing has_opted_out_capturing opt_in_capturing reset isFeatureEnabled onFeatureFlags getFeatureFlag getFeatureFlagPayload reloadFeatureFlags group updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures getActiveMatchingSurveys getSurveys".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
            posthog.init('phc_q4JbSbBR1EIUGPd3mwU7atUbu2fq2vv9sDkxoehUw7m',{api_host:'https://app.posthog.com'})`
          }
        </Script>
      </head>
      <body className={vt323.className}>
      <div className="content fixed top-0 right-0 w-full h-full z-0">
        <div className="layer absolute bg-gradient-to-br from-sky-200 to-sky-300 dark:from-sky-800 dark:to-sky-950 bg-cover w-full h-full"></div>
        <div className="layer pixel absolute clouds bg-cover w-full h-full"></div>
        <div className="layer pixel absolute clouds2 bg-cover w-full h-full"></div>
        <div className="layer pixel absolute clouds3 bg-cover w-full h-full"></div>
        <div className="layer pixel absolute city bg-cover w-full h-full"></div>
        <div className="layer pixel absolute foreground bg-cover w-full h-full"></div>
      </div>
      {children}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js"></script>
      </body>
    </html>
  )
}
