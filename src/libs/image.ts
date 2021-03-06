import { IImages } from '../models/interface';
import { globalCanvas } from './canvas';
import { mutiSort } from './utils';

/**
 * 绘制图片（包括圆角图片））
 * @param images
 */
export const drawImage = (images: IImages) => {
  const ctx = globalCanvas.getContext('2d');
  return new Promise((resolve: any) => {
    const { x, y, url, borderRadius = 0, borderWidth = 0, borderColor = '#fff' } = images;
    let { width, height } = images;
    const img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous';
    img.style.borderRadius = '35px';
    // console.log('000999', img.height, img.width);
    img.onload = () => {
      if (!width && !height) {
        width = img.width;
        height = img.height;
      }

      if (!width && height) {
        width = (img.width / img.height) * height;
      }

      if (width && !height) {
        height = (img.height / img.width) * width;
      }

      // 开始绘制圆角图片
      const pattern = ctx.createPattern(img, 'no-repeat');
      const r = borderRadius;
      const w = width!;
      const h = height!;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(x + w, y, x + w, y + h, r);
      ctx.arcTo(x + w, y + h, x, y + h, r);
      ctx.arcTo(x, y + h, x, y, r);
      ctx.arcTo(x, y, x + w, y, r);
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = pattern;
      ctx.fill();
      ctx.clip();
      ctx.drawImage(img, x, y, width, height);
      // ctx.drawImage(img, 0, 0, img.width, img.height, x, y, width, height);
      ctx.restore();
      resolve(1);
    };
  });
};

/**
 * 裁剪圆形图片，位置限制在裁剪区域
 * @param images
 */

export const drawCirleImage = (images: IImages) => {
  const ctx = globalCanvas.getContext('2d');
  return new Promise((resolve: any) => {
    const { x, y, url, width, height, borderRadius = 1, borderWidth, borderColor } = images;

    const img = new Image();
    img.src = url;
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      let w: number = width!;
      let h: number = height!;
      if (!width && !height) {
        w = img.height;
        h = img.height;
        if (img.height > img.width) {
          w = img.width;
          h = img.width;
        }
      }

      if (!width && height) {
        w = height;
      }

      if (width && !height) {
        h = width;
      }

      const r = borderRadius;
      const br = r / 2;

      const pattern = ctx.createPattern(img, 'no-repeat');
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(x + br, y); // 移动到左上角的点
      ctx.lineTo(x + w - br, y);
      ctx.arc(x + w - br, y + br, br, 2 * Math.PI * (3 / 4), 2 * Math.PI * (4 / 4));
      ctx.lineTo(x + w, y + h - br);
      ctx.arc(x + w - br, y + h - br, br, 0, 2 * Math.PI * (1 / 4));
      ctx.lineTo(x + br, y + h);
      ctx.arc(x + br, y + h - br, br, 2 * Math.PI * (1 / 4), 2 * Math.PI * (2 / 4));
      ctx.lineTo(x, y + br);
      ctx.arc(x + br, y + br, br, 2 * Math.PI * (2 / 4), 2 * Math.PI * (3 / 4));
      // ctx.beginPath();
      // ctx.moveTo(x + r, y);
      // ctx.arc(cx, cy, r, 0, 2 * Math.PI);
      // ctx.lineWidth = borderWidth;
      // ctx.strokeStyle = borderColor;
      // ctx.stroke();
      ctx.closePath();
      ctx.fillStyle = pattern;
      ctx.fill();
      ctx.clip();
      ctx.drawImage(img, x, y, w, h);
      ctx.restore();
      resolve(1);
    };
  });
};

// export const drawCirleImage = (images: IImages) => {
//   const ctx = globalCanvas.getContext('2d');
//   return new Promise((resolve: any) => {
//     const { x, y, width, height, url, borderRadius, borderWidth, borderColor } = images;
//     const img = new Image();
//     img.src = url;
//     img.crossOrigin = 'Anonymous';

//     img.onload = () => {
//       // let r: number;
//       // if (img.width > img.height) {
//       //   r = img.height / 2;
//       // } else {
//       //   r = img.width / 2;
//       // }
//       const r = width!;
//       const d = 2 * r;
//       const cx = x + r;
//       const cy = y + r;
//       const pattern = ctx.createPattern(img, 'no-repeat');
//       ctx.save();
//       ctx.beginPath();
//       ctx.moveTo(x + r, y);
//       ctx.arc(cx, cy, r, 0, 2 * Math.PI);
//       ctx.fillStyle = pattern;
//       ctx.fill();
//       ctx.clip();
//       ctx.drawImage(img, x, y, d, d);
//       ctx.restore();
//       resolve(1);
//     };
//   });
// };

// // 添加图片
// export const image = async (images: IImages[]) => {
//   mutiSort(images);
//   if (!images[0]) {
//     return;
//   }
//   for (let i = 0; i < images.length; i++) {
//     await drawImage(images[i]);
//     // await drawCirleImage(images[i]);
//     if (i === images.length - 1) {
//       console.log('image');
//       return globalCanvas;
//     }
//   }
// };
