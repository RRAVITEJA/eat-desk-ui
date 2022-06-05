import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Card, Link, Typography, Stack, IconButton, Button, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// utils
import { fCurrency } from '../../../../utils/formatNumber';
// @types
import { Product } from '../../../../@types/product';
// components
import Label from '../../../../components/Label';
import Image from '../../../../components/Image';
import { ColorPreview } from '../../../../components/color-utils';
import Iconify from 'src/components/Iconify';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  product: Product;
  index: number;
};

export default function ShopProductCard({ product, index }: Props) {
  const { name, cover, price, colors, status, priceSale } = product;
  const images = [
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    'https://images.unsplash.com/photo-1484723091739-30a097e8f929',
    'https://images.unsplash.com/photo-1473093295043-cdd812d0e601',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288',
    'https://static.toiimg.com/photo/55976415.cms',
    'https://www.indianhealthyrecipes.com/wp-content/uploads/2022/02/hyderabadi-biryani-recipe-chicken.jpg',
    'https://img.buzzfeed.com/buzzfeed-static/static/2014-06/23/15/campaign_images/webdr07/26-traditional-indian-foods-that-will-change-your-1-7312-1403550756-15_big.jpg',
  ];

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              zIndex: 9,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status}
          </Label>
        )}

        <Image alt={name} src={images[index]} ratio="1/1" />
      </Box>

      <Grid
        container
        justifyContent="space-between"
        alignItems="flex-end"
        spacing={0}
        sx={{ px: 1, py: 3 }}
      >
        <Grid item xs={8}>
          <Grid container direction={'column'}>
            <Typography variant="subtitle2">{name}</Typography>
            <Stack direction="row" spacing={0.5}>
              {priceSale && (
                <Typography
                  component="span"
                  sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
                >
                  {fCurrency(priceSale)}
                </Typography>
              )}

              <Typography variant="subtitle1">{fCurrency(price)}</Typography>
            </Stack>
          </Grid>
        </Grid>
        <Grid item>
          <Incrementer />
        </Grid>
      </Grid>
    </Card>
  );
}

function Incrementer() {
  const [quantity, setQuantity] = useState<number>(0);
  if (quantity < 1) {
    return (
      <Button
        fullWidth
        size="large"
        color="warning"
        variant="contained"
        startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
        onClick={() => {
          setQuantity(quantity + 1);
        }}
        sx={{ whiteSpace: 'nowrap', width: 80, height: 36 }}
      >
        ADD
      </Button>
    );
  }
  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032',
      }}
    >
      <IconButton
        size="small"
        color="inherit"
        disabled={quantity <= 1}
        onClick={() => {
          quantity && setQuantity(quantity - 1);
        }}
      >
        <Iconify icon={'eva:minus-fill'} width={14} height={14} />
      </IconButton>

      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center' }}>
        {quantity}
      </Typography>

      <IconButton
        size="small"
        color="inherit"
        onClick={() => {
          setQuantity(quantity + 1);
        }}
      >
        <Iconify icon={'eva:plus-fill'} width={14} height={14} />
      </IconButton>
    </Box>
  );
}
