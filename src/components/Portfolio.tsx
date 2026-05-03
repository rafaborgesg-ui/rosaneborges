/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

const portfolios = [
  {
    title: "Jardim Vertical Preservado",
    image: "https://lh3.googleusercontent.com/aida/ADBb0ugYdpa-dtlauELaJsewHWxU1zLj-LzbsScFtGjNIp2e4S2a122-xYxoaUgnTh5B9carsJ6S14EOwFfHm3RRLnoRGX7HfQ38y-h9GLQZYSjvCU6QQrqgHcb0y-M9BIm7hocVugM6fQFTJ_4VKkU-LVWfbSxAXAUFFBzCc4cal7zRb7oWMWqmFscFLI6wyqcuDErTc6D2E0dr7JvBKMMzgjKeYdmnU-lidWiRfSbqP9Z0q65yipQwBUomr9CFyk3cJ3GfFjT2itKxgA"
  },
  {
    title: "Jardim Vertical Natural",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhiVWPbv63R6xY_t12VOdetd-XOxjOgCSidqYa7JN9NBQl1lL_0Yo_u2VAvoHjqec7m9dKTXyaOp6XP8kgOy0tjSF21SIOHHLzS9mOKzibkmRxOW52k8EKW_E6PiLTdQ_7xaNupUcHKarnw7RbGrTfqmFz82FUsnp0j7jTDfHY9nIZAtl3pYHmvw8CkhHr1YgwqGSI8He0uTQPYdOhMsXAA13ZLTGi6QywvGAuAbJQfqiuHDUGrWHcmBHvSDRLtafzWkRHzdl-CjQ"
  },
  {
    title: "Jardim Vertical Musgo Moss",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhGCNov4u7V7oOKd72p__VO5xvD6tshA4Zz0mJXKS_N-qYF7SfOxsHc4-3vqzN2LEPtC0Kios_QKLuCMpqATv_lvi2Wew58ZGcFavG36AgHbdyqOC32flEhGZ0AB3GckCvGwoAy6U153MXhG3xVJzd7zn0pxn-vYpH_nB8O7oIGTlxqeYzv3WgS4Xeq6Rw5GtXHKdhqxnra9g1kL1lbafnXTLD2LfLUxy33u6tsmglBcbktJYDWkU9y1d9D0aa0L_xoXR_BVLHw"
  },
  {
    title: "Jardim Vertical Artificial",
    image: "https://lh3.googleusercontent.com/aida/ADBb0uhkI4iuh4_bnGbpl-4ms74fwdhfA1HOgnwR51T-CINs3XxjmjlXAUs8OaZugAMF6fPgCi-FMvhoVkF42TciCbznF6SLQO0rnU4lWqwgQ-3AwOCGxwSIybGTeZl9Md05qb8ki-vNU6zaH0LvjKRoZxoCxnvK9y1t0MCjOJV6VPN4zXfcHz1dBB8pDPY3D7zBjFeDRdePzzXYbJ4_fCj8v1acVkQYEROyTMKsktnMHYZIuxpfAL3FpF5fsTenYLgm-4IJ79QRzmy6Wg"
  }
];

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-secondary font-bold text-[10px] uppercase tracking-[0.3em]">Referência em Design</span>
          <h2 className="text-4xl md:text-5xl mt-4 font-display">Portfólio de Assinatura</h2>
          <div className="h-0.5 w-24 bg-secondary/20 mx-auto mt-6" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolios.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-[2rem] aspect-square"
            >
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent flex items-end p-8 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-white text-xl font-display italic">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
