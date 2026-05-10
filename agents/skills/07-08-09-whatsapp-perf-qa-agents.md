# ⚡ Performance, QA & WhatsApp Agents

## WhatsApp Agent (07)
### Order Flow
1. User views product → clicks "Order Now"
2. Opens WhatsApp with pre-filled message
3. No payment gateway needed — cash on delivery confirmed via WhatsApp

### WhatsApp CTA Rules
- Number: 923344739333 (no + in URL)
- Message must include: product name, price, color (if applicable)
- Link format: `https://wa.me/{number}?text={encoded_message}`

### Cart Integration
- Cart is currently a product browser (search/filter)
- Future: Add persistent cart with localStorage
- Future: Multi-item WhatsApp message

---

## Performance Agent (08)
### Checklist
- [ ] Images lazy loaded (use Cloudinary auto-format URLs)
- [ ] GSAP animations only after DOM ready
- [ ] Three.js scene lazy imported with React.lazy
- [ ] Route-based code splitting (TanStack Router handles this)
- [ ] LCP < 2.5s on 3G
- [ ] CLS < 0.1 (reserve space for images)

### Cloudinary Optimization URL Pattern
```ts
const optimizedUrl = (publicId: string, width: number) =>
  `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/w_${width},f_auto,q_auto/${publicId}`;
```

### Bundle Budget
- Total JS: < 300kb (gzipped)
- Three.js is ~170kb — lazy load it!

---

## QA Agent (09)
### Test Checklist
- [ ] Home page: hero animation plays, cards reveal on scroll
- [ ] Watches: filter works, images load
- [ ] Glasses: same
- [ ] Product detail: WhatsApp link opens correct message
- [ ] Cart: search/filter works
- [ ] Login/Signup: form validation, success/error toasts
- [ ] Contact: form submits, email sent
- [ ] Mobile (< 768px): bottom nav visible, all tap targets ≥ 44px
- [ ] Dark mode: check against design system
- [ ] No console errors in production build
