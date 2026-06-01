import React from 'react';
import { ShieldCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-4 group">
              {/* Premium Custom SVG Brand Logo (Shield-Check with Gold Gradient) */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-9 h-9" fill="none">
                <defs>
                  <linearGradient id="footerGold" x1="100%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#F9D423" />
                    <stop offset="50%" stop-color="#CCA43B" />
                    <stop offset="100%" stop-color="#9E7818" />
                  </linearGradient>
                </defs>
                <path d="M 434 85 L 413 105 L 386 136 L 385 139 L 385 167 L 382 200 L 378 227 L 373 251 L 368 270 L 360 294 L 358 297 L 358 299 L 356 302 L 356 304 L 353 309 L 353 311 L 341 335 L 339 337 L 335 345 L 331 350 L 330 353 L 317 371 L 302 389 L 283 408 L 264 424 L 249 435 L 246 436 L 233 445 L 225 449 L 222 449 L 220 450 L 220 507 L 225 507 L 231 504 L 233 504 L 235 502 L 248 496 L 250 494 L 255 492 L 257 490 L 265 486 L 287 471 L 313 450 L 329 435 L 348 414 L 369 386 L 370 383 L 372 381 L 375 375 L 377 373 L 378 370 L 380 368 L 383 361 L 385 359 L 396 337 L 396 335 L 399 330 L 399 328 L 401 325 L 401 323 L 405 315 L 406 310 L 408 307 L 411 298 L 411 295 L 413 292 L 422 258 L 428 228 L 432 199 L 435 160 L 435 90 Z" fill="url(#footerGold)" />
                <path d="M 220 6 L 220 65 L 223 65 L 256 82 L 258 82 L 265 86 L 267 86 L 272 89 L 274 89 L 277 91 L 279 91 L 282 93 L 285 94 L 287 94 L 290 96 L 308 102 L 312 103 L 316 103 L 318 102 L 329 91 L 338 83 L 344 78 L 351 73 L 359 66 L 359 64 L 357 63 L 355 63 L 347 61 L 341 59 L 337 58 L 322 53 L 319 51 L 317 51 L 311 49 L 308 47 L 306 47 L 303 46 L 300 44 L 298 44 L 295 42 L 293 42 L 288 39 L 286 39 L 277 34 L 275 34 L 262 27 L 260 27 L 258 25 L 256 25 L 254 23 L 235 14 L 233 12 L 228 10 L 226 8 L 224 8 L 222 6 Z" fill="url(#footerGold)" />
                <path d="M 218 6 L 197 17 L 195 19 L 180 26 L 178 28 L 176 28 L 147 42 L 145 42 L 127 50 L 119 52 L 116 54 L 60 70 L 26 77 L 5 80 L 2 83 L 2 102 L 0 104 L 0 138 L 2 140 L 3 178 L 7 215 L 15 258 L 25 295 L 36 325 L 49 353 L 66 382 L 84 407 L 100 426 L 121 447 L 145 467 L 168 483 L 183 492 L 190 495 L 192 497 L 214 507 L 219 506 L 218 504 L 218 450 L 208 447 L 177 427 L 157 411 L 131 385 L 117 368 L 104 349 L 94 332 L 82 307 L 70 274 L 59 229 L 55 204 L 52 174 L 51 126 L 56 122 L 92 115 L 142 99 L 145 97 L 167 89 L 172 86 L 174 86 L 203 72 L 205 70 L 215 65 L 219 64 L 219 16 Z" fill="#3b82f6" />
                <path d="M 509 2 L 493 7 L 478 14 L 476 14 L 469 18 L 467 18 L 431 37 L 429 39 L 416 46 L 395 60 L 356 90 L 326 117 L 308 135 L 276 170 L 237 218 L 222 238 L 210 256 L 205 260 L 200 255 L 193 244 L 182 230 L 166 214 L 156 207 L 154 207 L 148 204 L 144 203 L 135 203 L 122 207 L 109 215 L 100 222 L 93 229 L 93 231 L 95 233 L 97 233 L 111 242 L 130 260 L 147 280 L 169 309 L 205 363 L 207 365 L 210 364 L 212 359 L 214 357 L 216 352 L 227 335 L 229 330 L 231 328 L 232 325 L 234 323 L 247 300 L 251 295 L 255 287 L 270 265 L 271 262 L 310 205 L 333 174 L 356 145 L 394 101 L 429 65 L 443 52 L 467 32 Z" fill="#3b82f6" />
              </svg>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                Policy Perfect
              </span>
            </Link>
            <p className="text-sm text-slate-400 mb-6 leading-relaxed">
              Compare and buy the best insurance policies online. We help you find the right coverage at the best price.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Insurance</h3>
            <ul className="space-y-3">
              <li><Link to="/product/car" className="text-sm hover:text-orange-400 transition-colors">Car Insurance</Link></li>
              <li><Link to="/product/bike" className="text-sm hover:text-orange-400 transition-colors">Bike Insurance</Link></li>
              <li><Link to="/product/health" className="text-sm hover:text-orange-400 transition-colors">Health Insurance</Link></li>
              <li><Link to="/product/life" className="text-sm hover:text-orange-400 transition-colors">Life Insurance</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Partners</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4 uppercase text-sm tracking-wider">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">Disclaimer</a></li>
              <li><a href="#" className="text-sm hover:text-blue-400 transition-colors">ISNP</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-slate-500 text-center md:text-left max-w-3xl leading-relaxed">
            *Standard T&C Apply. Insurance is the subject matter of solicitation. Policy Perfect is an online insurance aggregator. 
            All savings and claims figures are based on internal data and vary by insurer.
          </p>
          <div className="flex items-center gap-1 text-sm text-slate-400">
            Made with <Heart size={14} className="text-red-500 fill-current" /> in India
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
