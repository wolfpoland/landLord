import { protectedProcedure, router } from '../trpc';
import { z } from 'zod';
import { Owner } from '@prisma/client';

export const apartment = router({
  addApartment: protectedProcedure
    .input(z.object({ name: z.string(), address: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const { id } = ctx.session?.user;
      let owner: Owner | null = null;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          owner: true,
        },
      });

      if (user?.owner) {
        owner = user?.owner;
      }

      if (!user) {
        throw new Error('User not found');
      }

      console.log('user', user);

      if (!user.owner) {
        console.log('no owner', user.owner);

        owner = await ctx.prisma.owner.create({
          data: {
            userId: id,
          },
        });

        await ctx.prisma.user.update({
          where: {
            id,
          },
          data: {
            owner: {
              connect: {
                id: owner.id,
              },
            },
          },
        });
      }

      if (!owner) {
        throw new Error('Owner not found');
      }

      console.log('gonna create', owner);

      return await ctx.prisma.apartment.create({
        data: {
          name: input.name,
          address: input.address,
          ownerId: owner.id,
        },
      });
    }),
  getApartment: protectedProcedure
    .input(z.object({ id: z.union([z.string(), z.undefined()]) }))
    .query(async ({ input, ctx }) => {
      const { id } = ctx.session?.user;

      const user = await ctx.prisma.user.findUnique({
        where: {
          id,
        },
        include: {
          owner: true,
        },
      });

      if (!user) {
        throw new Error('User not found');
      }

      if (!user.owner) {
        throw new Error('Owner not found');
      }

      console.log('user', user);

      const apartments = await ctx.prisma.apartment.findMany({
        where: {
          ownerId: user.owner.id,
        },
      });

      console.log('apartments', apartments);

      return apartments;
    }),
});
