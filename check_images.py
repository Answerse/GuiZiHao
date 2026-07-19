from PIL import Image
import os
files = [
    'recommend-1.png','recommend-2.png','recommend-3.png','recommend-4.png','recommend-5.png',
    'brand-guilin-satangju.png','brand-nanning-huolongguo.png','brand-longan-xiangjiao.png',
    'brand-hengxian-tianyumi.png','brand-hengxian-molihua.png','brand-baise-mangguo.png',
    'brand-guilin-luohanguo.png','brand-qinbei-lizhi.png','brand-leye-mihoutao.png',
    'brand-fanglin-mati.png','brand-guangxi-liubaocha.png','brand-liujiang-lianou.png',
    'brand-tengxian-fenge.png','brand-hongguniang-hongshu.png','brand-lipu-yu.png',
    'brand-gongcheng-yueshi.png'
]
base = '/Users/answerose/Documents/trae_projects/GuiZhihao/public/images'
for f in files:
    path = os.path.join(base, f)
    if os.path.exists(path):
        s = os.path.getsize(path)
        img = Image.open(path)
        print(f'{f}: {img.size} [{s} bytes]')
    else:
        print(f'{f}: NOT FOUND')
